-- name: GetTenantBySlug :one
SELECT * FROM tenants WHERE slug = $1 LIMIT 1;

-- name: GetTenantByID :one
SELECT * FROM tenants WHERE id = $1 LIMIT 1;