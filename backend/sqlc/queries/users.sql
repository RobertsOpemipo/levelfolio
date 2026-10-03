-- name: GetUserByEmail :one
SELECT * FROM users WHERE tenant_id = $1 AND email = $2 LIMIT 1;

-- name: GetUserByID :one
SELECT * FROM users WHERE id = $1 LIMIT 1;

-- name: ListUsersByDepartment :many
SELECT * FROM users WHERE tenant_id = $1 AND dept_id = $2 ORDER BY full_name ASC;