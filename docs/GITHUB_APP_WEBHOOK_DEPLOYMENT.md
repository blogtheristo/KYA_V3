# GitHub App Webhook - Deployment Guide

## Overview

The GitHub App Webhook service tracks installations of `dws-opencode-loop` to multiple repositories. It writes installation IDs to a local PostgreSQL database.

## Architecture

```
┌──────────────────────────────────────────────────────────────┐
│  DGX (Self-Hosted)                                           │
├──────────────────────────────────────────────────────────────┤
│  Local PostgreSQL                                            │
│  └── github_app_installations (installation_id, repo mapping)│
│                                                              │
│  Express Webhook Service                                     │
│  └── POST /github-webhook → saves to PostgreSQL             │
│                                                              │
│  opencode-all                                                │
│  └── Reads from PostgreSQL, fetches GitHub App tokens      │
└──────────────────────────────────────────────────────────────┘
```

## Prerequisites

- DGX running with Docker
- Local PostgreSQL instance (port 5432)
- GitHub App `dws-opencode-loop` created

## Installation

### 1. PostgreSQL Setup

```bash
# Create database
psql -U postgres -c "CREATE DATABASE github_app;"
psql -U postgres -c "CREATE USER admin WITH PASSWORD 'your_secure_password';"
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE github_app TO admin;"

# Apply migration
psql -U admin -d github_app -f supabase/migrations/103_github_app_installations.sql
```

### 2. Webhook Service

```bash
cd infrastructure/dgx-spark/github-app-webhook

# Configure environment
cp .env.example .env
# Edit .env with your PostgreSQL credentials and GitHub webhook secret

# Install dependencies
npm install

# Test locally
npm start

# Or run as systemd service
sudo cp infrastructure/dgx-spark/github-app-backup.service /etc/systemd/system/
sudo cp infrastructure/dgx-spark/github-app-backup.timer /etc/systemd/system/
sudo systemctl enable github-app-backup.timer
```

### 3. NGINX Reverse Proxy

```nginx
location /github-webhook {
  proxy_pass http://localhost:8080/github-webhook;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  
  # Verify GitHub signature (optional, app does its own validation)
  # proxy_set_header X-GitHub-Event $http_x_github_event;
}
```

### 4. GitHub App Configuration

1. Go to `https://github.com/settings/apps/dws-opencode-loop`
2. **Webhook URL:** `https://api.dws6.com/github-webhook`
3. **Webhook Secret:** Same as `GITHUB_WEBHOOK_SECRET` in `.env`
4. **Subscribe to events:** `installation`, `installation_repositories`

## Verification

### Test Webhook

```bash
# Get webhook delivery logs
curl -H "Accept: application/vnd.github+json" \
  -H "Authorization: Bearer YOUR_PAT" \
  https://api.github.com/app/hook/deliveries
```

### Check Database

```bash
psql -U admin -d github_app -c "SELECT * FROM github_app_installations;"
```

## Backup

Daily backup runs via systemd timer:

```bash
# Check backup status
systemctl status github-app-backup.timer

# Manually trigger backup
systemctl start github-app-backup.service
```

## Troubleshooting

### Service not starting

```bash
# Check logs
journalctl -u github-app-webhook.service -f

# Verify PostgreSQL connection
PGPASSWORD=your_password psql -h localhost -U admin -d github_app -c "SELECT 1;"
```

### Webhook not receiving events

```bash
# Check GitHub webhook configuration
curl -H "Authorization: Bearer YOUR_PAT" \
  https://api.github.com/repos/blogtheristo/dws6/hooks
```

### Installation not recorded

```bash
# Check webhook payload
# See GitHub webhook deliveries for error details

# Verify database schema
psql -U admin -d github_app -c "\d github_app_installations"
```

## Security

- `.env` must have restricted permissions (`chmod 600 .env`)
- Webhook secret should be 32+ character random string
- PostgreSQL authentication uses password (not peer)
- Backup files should be in `/backup/` with restricted access

## Maintenance

### Manual Backup

```bash
pg_dump -U admin github_app | gzip > /backup/github_app_$(date +%Y%m%d).sql.gz
```

### Restore from Backup

```bash
gunzip -c /backup/github_app_YYYYMMDD.sql.gz | psql -U admin github_app
```

### Clear Old Installations

```sql
-- Remove installations older than 1 year
DELETE FROM github_app_installations 
WHERE created_at < NOW() - INTERVAL '1 year';
```