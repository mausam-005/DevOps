# Math API

A simple Node.js REST API deployed to AWS ECS Fargate with a fully automated CI/CD pipeline using GitHub Actions and Terraform.

---

## About

This project is a basic math utility that takes two numbers and returns their sum. It includes a web-based frontend and a backend API built with Express.js.

```
POST /sum  { "a": 10, "b": 20 }  →  { "result": 30 }
```

---

## Project Structure

```
.
├── server.js                  # Express API server
├── src/
│   └── sum.js                 # Math utility module
├── tests/
│   ├── sum.test.js            # Unit tests
│   └── api.test.js            # Integration tests
├── public/
│   └── index.html             # Web frontend
├── terraform/
│   ├── main.tf                # AWS infrastructure (S3, ECR, ECS)
│   ├── variables.tf           # Terraform variables
│   └── outputs.tf             # Terraform outputs
├── .github/workflows/
│   └── pipeline.yml           # CI/CD pipeline
├── Dockerfile                 # Multi-stage container build
└── package.json
```

---

## How the Pipeline Works

Every push to `main` triggers the full pipeline:

```
Push to main
     ↓
Lint & Run Tests → generates JUnit report
     ↓
Terraform Init → Validate → Plan → Apply
     ↓
Docker Build → Push to ECR
     ↓
Deploy to ECS Fargate → Verify
```

---

## Running Locally

```bash
npm install
npm start        # http://localhost:3000
npm test         # runs unit + integration tests
```

---

## AWS Deployment

### 1. Get Your AWS Credentials

If using AWS Academy — start your lab, click **AWS Details → Show**, and copy your keys.

### 2. Add GitHub Secrets

Go to your repo → **Settings → Secrets and variables → Actions** and add:

| Secret | Value |
|---|---|
| `AWS_ACCESS_KEY_ID` | Your access key |
| `AWS_SECRET_ACCESS_KEY` | Your secret key |
| `AWS_SESSION_TOKEN` | Session token |
| `AWS_REGION` | `us-east-1` |
| `AWS_SUBNET_ID` | Your VPC subnet |
| `AWS_SECURITY_GROUP_ID` | Your security group |

To find your network values:

```bash
aws ec2 describe-subnets --query "Subnets[*].[SubnetId, CidrBlock]" --output table
aws ec2 describe-security-groups --query "SecurityGroups[*].[GroupId, GroupName]" --output table
```

### 3. Push and Deploy

```bash
git add .
git commit -m "deploy"
git push origin main
```

Go to the **Actions** tab to watch the pipeline run.

### 4. Access the App

Once deployed — go to **ECS → Clusters → math-api-cluster → Tasks**, copy the public IP, and open `http://<IP>:3000` in your browser.

---

## Infrastructure

Terraform provisions the following on AWS:

- **S3 Bucket** — for build artifacts, with versioning and encryption enabled
- **ECR Repository** — stores Docker images
- **ECS Cluster + Service** — runs the container on Fargate

---

## Notes

- AWS Academy session tokens expire every ~4 hours. Update your GitHub secrets each session.
- Make sure your security group allows inbound traffic on **port 3000**.
- The ECS task uses the existing **LabRole** — no IAM role creation needed.
