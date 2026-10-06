# GitHub App Installations Database Schema
# Migration: 103_github_app_installations.sql
# Purpose: Track GitHub App installation IDs per repository

CREATE TABLE IF NOT EXISTS github_app_installations (
  installation_id BIGINT PRIMARY KEY,
  tenant_id TEXT NOT NULL DEFAULT 'dws',
  account_login TEXT NOT NULL,
  account_type TEXT NOT NULL,
  repositories TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_installation_account ON github_app_installations(account_login);
CREATE INDEX IF NOT EXISTS idx_installation_repos ON github_app_installations USING GIN(repositories);

COMMENT ON TABLE github_app_installations IS 'GitHub App installation records for multi-repoopencode-all support';
COMMENT ON COLUMN github_app_installations.tenant_id IS 'Tenant identifier: dws, aegis, or customer-specific';