-- name: InsertAuditLog :exec
INSERT INTO audit_logs (tenant_id, actor_id, action, entity, ip_address, payload)
VALUES ($1, $2, $3, $4, $5, $6);