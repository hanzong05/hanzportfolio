import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

// Server-only. Uses the service role key, so the tables stay locked to the browser.
// Created on first use, so the site still builds without these variables set.
export function db(): SupabaseClient {
  if (client) return client;
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error("SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY must be set in the environment.");
  }
  client = createClient(url, key, { auth: { persistSession: false } });
  return client;
}
