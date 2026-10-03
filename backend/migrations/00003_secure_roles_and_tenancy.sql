-- +goose Up
-- +goose StatementBegin
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'levelfolio_app') THEN
    CREATE ROLE levelfolio_app WITH LOGIN PASSWORD 'app_secure_password_dev' NOSUPERUSER NOCREATEDB NOCREATEROLE NOBYPASSRLS;
  END IF;
END
$$;
-- +goose StatementEnd

-- 2. Force Row Level Security on all tenant-aware tables
ALTER TABLE departments FORCE ROW LEVEL SECURITY;
ALTER TABLE teams FORCE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;
ALTER TABLE courses FORCE ROW LEVEL SECURITY;
ALTER TABLE lessons FORCE ROW LEVEL SECURITY;
ALTER TABLE enrollments FORCE ROW LEVEL SECURITY;
ALTER TABLE certificates FORCE ROW LEVEL SECURITY;
ALTER TABLE xp_events FORCE ROW LEVEL SECURITY;
ALTER TABLE badges FORCE ROW LEVEL SECURITY;
ALTER TABLE user_badges FORCE ROW LEVEL SECURITY;
ALTER TABLE streaks FORCE ROW LEVEL SECURITY;
ALTER TABLE audit_logs FORCE ROW LEVEL SECURITY;

-- 3. Grant schema usage and selective permissions to levelfolio_app
GRANT USAGE ON SCHEMA public TO levelfolio_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO levelfolio_app;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO levelfolio_app;

-- 4. HARDEN IMMUTABLE TABLES: Revoke UPDATE and DELETE on ledger tables
REVOKE UPDATE, DELETE ON xp_events FROM levelfolio_app;
REVOKE UPDATE, DELETE ON audit_logs FROM levelfolio_app;

-- +goose Down
REVOKE ALL PRIVILEGES ON ALL TABLES IN SCHEMA public FROM levelfolio_app;
REVOKE USAGE ON SCHEMA public FROM levelfolio_app;
DROP ROLE IF EXISTS levelfolio_app;