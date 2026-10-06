# GitHub App Webhook - DGX

Simple Express.js webhook service for tracking GitHub App installations.

## Setup

1. Environment variables (create `.env`):
```
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
GITHUB_WEBHOOK_SECRET=...
```

2. Install dependencies:
```bash
cd infrastructure/dgx-spark/github-app-webhook
npm install
```

3. Start service:
```bash
./start.sh
```

Service runs on port 8080 (configurable via `PORT` env).

## Configuration

### GitHub App Webhook URL

In GitHub App settings → "Webhook URL":
```
https://api.dws6.com/github-webhook
```

### DB Schema

Migration needed: `supabase/migrations/103_github_app_installations.sql`

```sql
CREATE TABLE github_app_installations (
  installation_id BIGINT PRIMARY KEY,
  account_login TEXT NOT NULL,
  account_type TEXT NOT NULL,
  repositories TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

## Usage

When GitHub App is installed to a repository, webhook receives:
```json
{
  "installation": { "id": 123456, "account": { "login": "blogtheristo", "type": "Organization" } },
  "repositories_added": [{ "full_name": "blogtheristo/KYA_V3" }]
}
```

Loop reads this table to get installation IDs dynamically.

## NGINX Reverse Proxy (DGX)

```nginx
location /github-webhook {
  proxy_pass http://localhost:8080/github-webhook;
  proxy_set_header Host $host;
  proxy_set_header X-Real-IP $remote_addr;
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```