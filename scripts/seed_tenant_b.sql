-- Seed Second Tenant: Globex Corporation Archive
INSERT INTO tenants (id, name, slug, created_at, updated_at)
VALUES (
    '00000002-0000-0000-0000-000000000001',
    'Globex Corporation Archive',
    'globex',
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Seed Globex Department
INSERT INTO departments (id, tenant_id, name, created_at)
VALUES (
    '00000002-0001-0000-0000-000000000001',
    '00000002-0000-0000-0000-000000000001',
    'Globex Operations',
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Seed Globex User (uses full_name and dept_id)
INSERT INTO users (id, tenant_id, dept_id, email, full_name, role, active, leaderboard_opt_out, created_at, updated_at)
VALUES (
    '00000002-0002-0000-0000-000000000001',
    '00000002-0000-0000-0000-000000000001',
    '00000002-0001-0000-0000-000000000001',
    'marcus@globex.test',
    'Marcus Vance',
    'learner',
    true,
    false,
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;

-- Seed Globex Course (uses kind, published_at)
INSERT INTO courses (id, tenant_id, title, description, kind, version, published_at, created_at, updated_at)
VALUES (
    '00000002-0003-0000-0000-000000000001',
    '00000002-0000-0000-0000-000000000001',
    'Globex Internal Protocols',
    'Proprietary Globex training materials.',
    'standard',
    1,
    NOW(),
    NOW(),
    NOW()
) ON CONFLICT (id) DO NOTHING;