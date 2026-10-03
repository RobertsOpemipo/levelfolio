-- name: RecordXPEvent :one
INSERT INTO xp_events (tenant_id, user_id, source, points)
VALUES ($1, $2, $3, $4)
RETURNING *;

-- name: GetUserTotalXP :one
SELECT COALESCE(SUM(points), 0)::BIGINT as total_xp
FROM xp_events
WHERE user_id = $1 AND tenant_id = $2;

-- name: GetUserBadges :many
SELECT b.id, b.key, b.title, b.description, b.icon_slug, ub.earned_at
FROM badges b
JOIN user_badges ub ON ub.badge_id = b.id
WHERE ub.user_id = $1 AND ub.tenant_id = $2
ORDER BY ub.earned_at DESC;

-- name: AwardBadge :one
INSERT INTO user_badges (tenant_id, user_id, badge_id)
VALUES ($1, $2, $3)
ON CONFLICT (user_id, badge_id) DO NOTHING
RETURNING *;