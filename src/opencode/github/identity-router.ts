// Identity Router - Opencode GitHub App installations
// Reads from local PostgreSQL, writes opencode-all auth tokens

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface GithubInstallation {
  installation_id: number;
  tenant_id: string;
  account_login: string;
  account_type: string;
  repositories: string[];
  created_at: string;
}

export async function getInstallationForRepo(repo: string): Promise<GithubInstallation> {
  const { data, error } = await supabase
    .from('github_app_installations')
    .select('*')
    .contains('repositories', [repo])
    .single();

  if (error) {
    throw new Error(`GitHub App not installed for repository ${repo}: ${error.message}`);
  }

  if (!data) {
    throw new Error(`No installation found for repository ${repo}`);
  }

  return data as GithubInstallation;
}

export async function listAllInstallations(): Promise<GithubInstallation[]> {
  const { data, error } = await supabase
    .from('github_app_installations')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to list installations: ${error.message}`);
  }

  return data as GithubInstallation[];
}

// TODO: Implement GitHub App JWT and token exchange
export async function getAccessToken(installationId: number): Promise<string> {
  // This will be implemented when GitHub App webhook is deployed
  // For now, returns placeholder
  throw new Error('getAccessToken not yet implemented - deploy webhook first');
}