#!/usr/bin/env node

const express = require('express');
const crypto = require('crypto');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(express.text({ type: 'application/json' }));

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
const webhookSecret = process.env.GITHUB_WEBHOOK_SECRET;

if (!supabaseUrl || !supabaseKey || !webhookSecret) {
  console.error('Missing environment variables: SUPABASE_URL, SUPABASE_KEY, GITHUB_WEBHOOK_SECRET');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

function verifySignature(req) {
  const signature = req.headers['x-hub-signature-256'];
  if (!signature) return false;
  
  const body = req.body;
  const hash = 'sha256=' + crypto.createHmac('sha256', webhookSecret).update(body).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(hash, 'hex'));
}

app.post('/github-webhook', async (req, res) => {
  if (!verifySignature(req)) {
    console.error('Invalid GitHub webhook signature');
    return res.status(401).send('Invalid signature');
  }

  const event = req.headers['x-github-event'];
  const payload = JSON.parse(req.body);

  console.log(`Received GitHub event: ${event}`);

  if (event === 'installation') {
    const { installation, repositories_added, repositories_removed } = payload;
    
    const repos = repositories_added?.map(r => r.full_name) || [];
    
    const { error } = await supabase
      .from('github_app_installations')
      .upsert({
        installation_id: installation.id,
        account_login: installation.account.login,
        account_type: installation.account.type,
        repositories: repos,
        created_at: new Date().toISOString()
      }, { onConflict: 'installation_id' });

    if (error) {
      console.error('Failed to save installation:', error.message);
      return res.status(500).json({ error: error.message });
    }
    
    console.log(`✓ Installation saved: ${installation.id} (${installation.account.login})`);
    console.log(`  Repositories: ${repos.length > 0 ? repos.join(', ') : 'none'}`);
  }

  res.status(200).end();
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`GitHub App Webhook listening on port ${PORT}`);
});

module.exports = { app, verifySignature };