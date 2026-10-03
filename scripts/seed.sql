-- Clean up any partial test data
TRUNCATE TABLE xp_events, user_badges, badges, certificates, enrollments, lessons, courses, users, teams, departments, tenants CASCADE;

-- 1. Create Demo Tenant: Acme Archive
INSERT INTO tenants (id, slug, name, plan)
VALUES ('00000001-0000-0000-0000-000000000001', 'acme', 'Acme Corporation Archive', 'enterprise')
ON CONFLICT (id) DO UPDATE SET slug = EXCLUDED.slug, name = EXCLUDED.name;

-- 2. Create Departments & Teams
INSERT INTO departments (id, tenant_id, name)
VALUES 
  ('0000000d-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001', 'Information Security'),
  ('0000000d-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000001', 'Operations');

INSERT INTO teams (id, tenant_id, dept_id, name)
VALUES 
  ('0000000e-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001', '0000000d-0000-0000-0000-000000000001', 'Security Compliance');

-- 3. Persona Users: Amara (Cardholder/Learner), Tunde (Manager), Ngozi (Tenant Admin)
INSERT INTO users (id, tenant_id, email, full_name, role, dept_id, team_id)
VALUES 
  ('00000002-0000-0000-0000-000000000001', '00000001-0000-0000-0000-000000000001', 'amara@acme.test', 'Amara Okafor', 'learner', '0000000d-0000-0000-0000-000000000001', '0000000e-0000-0000-0000-000000000001'),
  ('00000002-0000-0000-0000-000000000002', '00000001-0000-0000-0000-000000000001', 'tunde@acme.test', 'Tunde Bakare', 'manager', '0000000d-0000-0000-0000-000000000001', '0000000e-0000-0000-0000-000000000001'),
  ('00000002-0000-0000-0000-000000000003', '00000001-0000-0000-0000-000000000001', 'ngozi@acme.test', 'Ngozi Eze', 'tenant_admin', '0000000d-0000-0000-0000-000000000001', '0000000e-0000-0000-0000-000000000001');

-- 4. Sample File (Course): "Welcome to the Archive" Onboarding
INSERT INTO courses (id, tenant_id, title, description, kind, published_at, created_by)
VALUES (
  '00000003-0000-0000-0000-000000000001',
  '00000001-0000-0000-0000-000000000001',
  'Welcome to the Archive: Cardholder Onboarding',
  'Master the protocols, records retention policies, and file management principles of the Archive.',
  'onboarding',
  NOW(),
  '00000002-0000-0000-0000-000000000003'
);

-- 5. Index Cards (Lessons)
INSERT INTO lessons (id, tenant_id, course_id, position, title, type, content, video_metadata)
VALUES 
(
  '00000004-0000-0000-0000-000000000001',
  '00000001-0000-0000-0000-000000000001',
  '00000003-0000-0000-0000-000000000001',
  1,
  'Index Card 01: Core Operating Protocols',
  'text',
  '{"body": "Welcome Cardholder. In this Archive, every record is immutable and every audit leaves a trace."}'::jsonb,
  '{}'::jsonb
),
(
  '00000004-0000-0000-0000-000000000002',
  '00000001-0000-0000-0000-000000000001',
  '00000003-0000-0000-0000-000000000001',
  2,
  'Index Card 02: Handling Sensitive Records (Video)',
  'video',
  '{"summary": "A 3-minute briefing on data classification, document redacting, and return-by slips."}'::jsonb,
  '{"duration_seconds": 180, "poster_image_url": "/posters/security_briefing.png", "captions_url": "/captions/security_briefing.vtt"}'::jsonb
),
(
  '00000004-0000-0000-0000-000000000003',
  '00000001-0000-0000-0000-000000000001',
  '00000003-0000-0000-0000-000000000001',
  3,
  'Index Card 03: Final Audit (Boss Challenge)',
  'quiz',
  '{"questions": [{"id": "q1", "text": "What is the penalty for failing a return-by slip?", "options": ["Overdue escalation", "Nothing"], "correct": 0}]}'::jsonb,
  '{}'::jsonb
);

-- 6. Enrollment with Return-by Slip for Amara
INSERT INTO enrollments (id, tenant_id, user_id, course_id, due_at, status)
VALUES (
  '00000005-0000-0000-0000-000000000001',
  '00000001-0000-0000-0000-000000000001',
  '00000002-0000-0000-0000-000000000001',
  '00000003-0000-0000-0000-000000000001',
  NOW() + INTERVAL '7 days',
  'enrolled'
);

-- 7. Library Stamp Badge
INSERT INTO badges (id, tenant_id, key, title, description, icon_slug)
VALUES (
  '0000000b-0000-0000-0000-000000000001',
  '00000001-0000-0000-0000-000000000001',
  'stamp_first_entry',
  'First Stamp: Induction Complete',
  'Awarded upon completion of the initial Archive onboarding course.',
  'library_stamp_green'
);

-- 8. Initial XP Ledger Entry (Day 1 Welcome XP)
INSERT INTO xp_events (tenant_id, user_id, source, points)
VALUES ('00000001-0000-0000-0000-000000000001', '00000002-0000-0000-0000-000000000001', 'welcome_induction', 100);