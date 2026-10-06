#!/bin/bash
# Daily backup of GitHub App installations DB
# Source: localhost PostgreSQL
# Target: /backup/github_app_*.sql.gz (separate backup volume)

set -euo pipefail

BACKUP_DIR="/backup"
DB_NAME="github_app"
DB_USER="admin"
TIMESTAMP=$(date +%Y%m%d)

# Ensure backup directory exists
mkdir -p "$BACKUP_DIR"

# Perform backup
pg_dump -U "$DB_USER" "$DB_NAME" | gzip > "$BACKUP_DIR/github_app_${TIMESTAMP}.sql.gz"

# Remove backups older than 30 days (separate retention from source data)
find "$BACKUP_DIR" -name "github_app_*.sql.gz" -mtime +30 -delete

echo "Backup completed: github_app_${TIMESTAMP}.sql.gz"