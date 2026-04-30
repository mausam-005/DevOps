# =============================================
# S3 Outputs
# =============================================

output "s3_bucket_name" {
  description = "S3 artifact bucket name"
  value       = aws_s3_bucket.artifacts.id
}

output "s3_bucket_arn" {
  description = "S3 artifact bucket ARN"
  value       = aws_s3_bucket.artifacts.arn
}

# =============================================
# ECR Outputs
# =============================================

output "ecr_url" {
  description = "ECR repository URL for docker push"
  value       = aws_ecr_repository.math_api.repository_url
}

# =============================================
# ECS Outputs
# =============================================

output "cluster_name" {
  description = "ECS cluster name"
  value       = aws_ecs_cluster.main.name
}

output "service_name" {
  description = "ECS service name"
  value       = aws_ecs_service.api.name
}

output "task_family" {
  description = "ECS task definition family"
  value       = aws_ecs_task_definition.api.family
}
