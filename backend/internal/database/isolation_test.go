package database_test

import (
	"context"
	"os"
	"testing"

	"github.com/jackc/pgx/v5"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

const (
	tenantA = "00000001-0000-0000-0000-000000000001" // Acme
	tenantB = "00000002-0000-0000-0000-000000000001" // Globex
)

func getAppConnection(t *testing.T) *pgx.Conn {
	dsn := os.Getenv("TEST_DATABASE_URL")
	if dsn == "" {
		// Strictly connect as unprivileged, non-BYPASSRLS levelfolio_app role
		dsn = "postgres://levelfolio_app:app_secure_password_dev@localhost:5434/levelfolio_dev?sslmode=disable"
	}
	conn, err := pgx.Connect(context.Background(), dsn)
	require.NoError(t, err, "failed to connect as levelfolio_app")
	return conn
}

func TestTenantIsolation_NoTenantSet(t *testing.T) {
	conn := getAppConnection(t)
	defer conn.Close(context.Background())

	ctx := context.Background()

	var count int
	err := conn.QueryRow(ctx, "SELECT COUNT(*) FROM users;").Scan(&count)
	require.NoError(t, err)
	assert.Equal(t, 0, count, "unscoped query must return 0 rows under RLS")

	err = conn.QueryRow(ctx, "SELECT COUNT(*) FROM courses;").Scan(&count)
	require.NoError(t, err)
	assert.Equal(t, 0, count, "unscoped query must return 0 courses")
}

func TestTenantIsolation_CrossTenantReadBlocked(t *testing.T) {
	conn := getAppConnection(t)
	defer conn.Close(context.Background())

	ctx := context.Background()
	tx, err := conn.Begin(ctx)
	require.NoError(t, err)
	defer tx.Rollback(ctx)

	// Set session context to Tenant A
	_, err = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
	require.NoError(t, err)

	// Try reading Tenant B's user (Marcus)
	var email string
	err = tx.QueryRow(ctx, "SELECT email FROM users WHERE tenant_id = $1;", tenantB).Scan(&email)
	assert.ErrorIs(t, err, pgx.ErrNoRows, "Tenant A context must not read Tenant B users")

	// Try reading Tenant B's course
	var title string
	err = tx.QueryRow(ctx, "SELECT title FROM courses WHERE tenant_id = $1;", tenantB).Scan(&title)
	assert.ErrorIs(t, err, pgx.ErrNoRows, "Tenant A context must not read Tenant B courses")
}

func TestTenantIsolation_CrossTenantWriteBlocked(t *testing.T) {
	conn := getAppConnection(t)
	defer conn.Close(context.Background())

	ctx := context.Background()
	tx, err := conn.Begin(ctx)
	require.NoError(t, err)
	defer tx.Rollback(ctx)

	// Set session context to Tenant A
	_, err = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
	require.NoError(t, err)

	// Attempt insertion targeting Tenant B UUID
	_, err = tx.Exec(ctx, `
		INSERT INTO courses (id, tenant_id, title, description, published, created_at, updated_at)
		VALUES ('00000003-9999-0000-0000-000000000001', $1, 'Foreign Course', 'test', true, NOW(), NOW());
	`, tenantB)

	require.Error(t, err, "inserting foreign tenant_id must violate RLS WITH CHECK policy")
}

func TestLedgerImmutability_XPEventsAndAuditLogs(t *testing.T) {
	conn := getAppConnection(t)
	defer conn.Close(context.Background())

	ctx := context.Background()

	// 1. UPDATE on xp_events must fail on permissions
	t.Run("RejectUpdateXPEvents", func(t *testing.T) {
		tx, err := conn.Begin(ctx)
		require.NoError(t, err)
		defer tx.Rollback(ctx)

		_, _ = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
		_, err = tx.Exec(ctx, "UPDATE xp_events SET points = 999999;")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "permission denied for table xp_events")
	})

	// 2. DELETE on xp_events must fail on permissions
	t.Run("RejectDeleteXPEvents", func(t *testing.T) {
		tx, err := conn.Begin(ctx)
		require.NoError(t, err)
		defer tx.Rollback(ctx)

		_, _ = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
		_, err = tx.Exec(ctx, "DELETE FROM xp_events;")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "permission denied for table xp_events")
	})

	// 3. UPDATE on audit_logs must fail on permissions
	t.Run("RejectUpdateAuditLogs", func(t *testing.T) {
		tx, err := conn.Begin(ctx)
		require.NoError(t, err)
		defer tx.Rollback(ctx)

		_, _ = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
		_, err = tx.Exec(ctx, "UPDATE audit_logs SET action = 'tampered';")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "permission denied for table audit_logs")
	})

	// 4. DELETE on audit_logs must fail on permissions
	t.Run("RejectDeleteAuditLogs", func(t *testing.T) {
		tx, err := conn.Begin(ctx)
		require.NoError(t, err)
		defer tx.Rollback(ctx)

		_, _ = tx.Exec(ctx, "SELECT set_config('app.tenant_id', $1, true);", tenantA)
		_, err = tx.Exec(ctx, "DELETE FROM audit_logs;")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "permission denied for table audit_logs")
	})
}