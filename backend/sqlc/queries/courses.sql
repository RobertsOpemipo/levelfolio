-- name: ListPublishedCourses :many
SELECT * FROM courses 
WHERE tenant_id = $1 AND published_at IS NOT NULL 
ORDER BY title ASC;

-- name: GetCourseWithLessons :many
SELECT 
    c.id as course_id, c.title as course_title, c.kind as course_kind,
    l.id as lesson_id, l.position, l.title as lesson_title, l.type as lesson_type,
    l.content, l.video_metadata
FROM courses c
JOIN lessons l ON l.course_id = c.id
WHERE c.id = $1 AND c.tenant_id = $2
ORDER BY l.position ASC;

-- name: GetUserShelf :many
SELECT 
    e.id as enrollment_id, e.status, e.due_at, e.score, e.completed_at,
    c.id as course_id, c.title as course_title, c.kind as course_kind
FROM enrollments e
JOIN courses c ON c.id = e.course_id
WHERE e.user_id = $1 AND e.tenant_id = $2
ORDER BY e.due_at ASC NULLS LAST;