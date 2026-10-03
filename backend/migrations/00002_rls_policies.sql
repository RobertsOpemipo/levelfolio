-- +goose Up
-- Enable Row Level Security across all tenant-owned tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

-- +goose StatementBegin
CREATE OR REPLACE FUNCTION get_current_tenant_id() RETURNS UUID AS $$
BEGIN
    RETURN NULLIF(current_setting('app.current_tenant_id', true), '')::UUID;
END;
$$ LANGUAGE plpgsql STABLE;
-- +goose StatementEnd

-- RLS Policies
CREATE POLICY tenant_isolation_departments ON departments
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_teams ON teams
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_users ON users
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_courses ON courses
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_lessons ON lessons
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_enrollments ON enrollments
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_certificates ON certificates
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_xp_events ON xp_events
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_badges ON badges
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_user_badges ON user_badges
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_streaks ON streaks
    FOR ALL USING (tenant_id = get_current_tenant_id());

CREATE POLICY tenant_isolation_audit_logs ON audit_logs
    FOR ALL USING (tenant_id = get_current_tenant_id());

-- +goose Down
DROP POLICY IF EXISTS tenant_isolation_audit_logs ON audit_logs;
DROP POLICY IF EXISTS tenant_isolation_streaks ON streaks;
DROP POLICY IF EXISTS tenant_isolation_user_badges ON user_badges;
DROP POLICY IF EXISTS tenant_isolation_badges ON badges;
DROP POLICY IF EXISTS tenant_isolation_xp_events ON xp_events;
DROP POLICY IF EXISTS tenant_isolation_certificates ON certificates;
DROP POLICY IF EXISTS tenant_isolation_enrollments ON enrollments;
DROP POLICY IF EXISTS tenant_isolation_lessons ON lessons;
DROP POLICY IF EXISTS tenant_isolation_courses ON courses;
DROP POLICY IF EXISTS tenant_isolation_users ON users;
DROP POLICY IF EXISTS tenant_isolation_teams ON teams;
DROP POLICY IF EXISTS tenant_isolation_departments ON departments;
DROP FUNCTION IF EXISTS get_current_tenant_id();