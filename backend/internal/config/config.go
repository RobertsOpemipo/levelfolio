package config

import (
	"fmt"
	"os"
	"strconv"
	"time"
)

type Config struct {
	Environment         string
	Port                int
	DatabaseURL         string
	RedisURL            string
	JWTSecret           string
	JWTIssuer           string
	JWTAccessTTL        time.Duration
	JWTRefreshTTL       time.Duration
	StorageEndpoint     string
	StorageBucket       string
	StorageRegion       string
	StorageAccessKey    string
	StorageSecretKey    string
	StorageUsePathStyle bool
	MaxVideoSizeBytes   int64
}

func Load() (*Config, error) {
	port, err := strconv.Atoi(getEnv("PORT", "8080"))
	if err != nil {
		return nil, fmt.Errorf("invalid PORT: %w", err)
	}

	maxVideoMB, _ := strconv.ParseInt(getEnv("MAX_VIDEO_MB", "500"), 10, 64)

	return &Config{
		Environment:         getEnv("ENV", "development"),
		Port:                port,
		DatabaseURL:         getEnv("DATABASE_URL", "postgres://archive_user:archive_password@localhost:5434/levelfolio_dev?sslmode=disable"),
		RedisURL:            getEnv("REDIS_URL", "redis://localhost:6379/0"),
		JWTSecret:           getEnv("JWT_SECRET", "archive-ledger-secure-key-32-chars-min"),
		JWTIssuer:           getEnv("JWT_ISSUER", "levelfolio.app"),
		JWTAccessTTL:        15 * time.Minute,
		JWTRefreshTTL:       7 * 24 * time.Hour,
		StorageEndpoint:     getEnv("STORAGE_ENDPOINT", "http://localhost:9000"),
		StorageBucket:       getEnv("STORAGE_BUCKET", "levelfolio-vault"),
		StorageRegion:       getEnv("STORAGE_REGION", "auto"),
		StorageAccessKey:    getEnv("STORAGE_ACCESS_KEY", "minioadmin"),
		StorageSecretKey:    getEnv("STORAGE_SECRET_KEY", "minioadminpassword"),
		StorageUsePathStyle: getEnv("ENV", "development") == "development",
		MaxVideoSizeBytes:   maxVideoMB * 1024 * 1024,
	}, nil
}

func getEnv(key, fallback string) string {
	if val := os.Getenv(key); val != "" {
		return val
	}
	return fallback
}
