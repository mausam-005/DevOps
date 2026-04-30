# =============================================
# General
# =============================================

variable "aws_region" {
  description = "AWS region for deployment"
  type        = string
  default     = "us-east-1"
}

variable "project_name" {
  description = "Project identifier used for naming all resources"
  type        = string
  default     = "math-api"
}

# =============================================
# S3 Configuration
# =============================================

variable "s3_bucket_name" {
  description = "Globally unique S3 bucket for build artifacts"
  type        = string
  default     = "mausam-math-api-artifacts-2026"
}

# =============================================
# Networking (set via GitHub Secrets / TF_VAR_*)
# =============================================

variable "subnet_id" {
  description = "VPC subnet ID for ECS tasks"
  type        = string

  validation {
    condition     = can(regex("^subnet-[a-z0-9]+$", var.subnet_id))
    error_message = "Must be a valid subnet ID (subnet-xxxxxxxx)."
  }
}

variable "security_group_id" {
  description = "Security group ID allowing inbound on app port"
  type        = string

  validation {
    condition     = can(regex("^sg-[a-z0-9]+$", var.security_group_id))
    error_message = "Must be a valid security group ID (sg-xxxxxxxx)."
  }
}

# =============================================
# Container & Task Settings
# =============================================

variable "app_port" {
  description = "Port the Node.js application listens on"
  type        = number
  default     = 3000
}

variable "cpu" {
  description = "Fargate task CPU units"
  type        = string
  default     = "256"
}

variable "memory" {
  description = "Fargate task memory in MB"
  type        = string
  default     = "512"
}

variable "task_count" {
  description = "Number of running task instances"
  type        = number
  default     = 1
}
