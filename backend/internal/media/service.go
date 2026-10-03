package media

import (
	"context"
	"errors"
	"fmt"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go-v2/aws"
	s3config "github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/credentials"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/google/uuid"
	"github.com/levelfolio/backend/internal/config"
)

type ProcessingStatus string

const (
	StatusQuarantined ProcessingStatus = "quarantined"
	StatusClean       ProcessingStatus = "clean"
	StatusRejected    ProcessingStatus = "rejected"
)

type SignedUploadTicket struct {
	UploadURL string           `json:"upload_url"`
	FileKey   string           `json:"file_key"`
	Status    ProcessingStatus `json:"processing_status"`
	ExpiresAt time.Time        `json:"expires_at"`
}

type Service struct {
	client        *s3.Client
	presignClient *s3.PresignClient
	bucket        string
	maxVideoBytes int64
}

func NewService(cfg *config.Config) (*Service, error) {
	customResolver := aws.EndpointResolverWithOptionsFunc(func(service, region string, options ...interface{}) (aws.Endpoint, error) {
		return aws.Endpoint{
			URL:               cfg.StorageEndpoint,
			SigningRegion:     cfg.StorageRegion,
			HostnameImmutable: true,
		}, nil
	})

	awsCfg, err := s3config.LoadDefaultConfig(context.Background(),
		s3config.WithEndpointResolverWithOptions(customResolver),
		s3config.WithCredentialsProvider(credentials.NewStaticCredentialsProvider(cfg.StorageAccessKey, cfg.StorageSecretKey, "")),
		s3config.WithRegion(cfg.StorageRegion),
	)
	if err != nil {
		return nil, fmt.Errorf("failed to init storage credentials: %w", err)
	}

	client := s3.NewFromConfig(awsCfg, func(o *s3.Options) {
		o.UsePathStyle = cfg.StorageUsePathStyle
	})

	return &Service{
		client:        client,
		presignClient: s3.NewPresignClient(client),
		bucket:        cfg.StorageBucket,
		maxVideoBytes: cfg.MaxVideoSizeBytes,
	}, nil
}

func (s *Service) RequestUploadURL(ctx context.Context, tenantID, fileCategory, filename string, contentLength int64) (*SignedUploadTicket, error) {
	if fileCategory == "video" && contentLength > s.maxVideoBytes {
		return nil, fmt.Errorf("file size %d bytes exceeds configured limit of %d bytes", contentLength, s.maxVideoBytes)
	}

	fileID := uuid.New().String()
	fileKey := fmt.Sprintf("tenants/%s/uploads/%s/%s_%s", tenantID, fileCategory, fileID, filename)

	req, err := s.presignClient.PresignPutObject(ctx, &s3.PutObjectInput{
		Bucket:        aws.String(s.bucket),
		Key:           aws.String(fileKey),
		ContentLength: aws.Int64(contentLength),
	}, s3.WithPresignExpires(15*time.Minute))

	if err != nil {
		return nil, fmt.Errorf("failed to presign upload url: %w", err)
	}

	return &SignedUploadTicket{
		UploadURL: req.URL,
		FileKey:   fileKey,
		Status:    StatusQuarantined,
		ExpiresAt: time.Now().Add(15 * time.Minute),
	}, nil
}

func (s *Service) GenerateDownloadStreamURL(ctx context.Context, requestingTenantID, fileKey string, status ProcessingStatus) (string, error) {
	expectedPrefix := fmt.Sprintf("tenants/%s/", requestingTenantID)
	if !strings.HasPrefix(fileKey, expectedPrefix) {
		return "", errors.New("forbidden: file does not belong to requesting tenant")
	}

	if status != StatusClean {
		return "", fmt.Errorf("access denied: file is currently in status '%s'", status)
	}

	req, err := s.presignClient.PresignGetObject(ctx, &s3.GetObjectInput{
		Bucket: aws.String(s.bucket),
		Key:    aws.String(fileKey),
	}, s3.WithPresignExpires(1*time.Hour))

	if err != nil {
		return "", fmt.Errorf("failed to presign download stream: %w", err)
	}

	return req.URL, nil
}