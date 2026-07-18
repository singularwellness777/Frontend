import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Anon client for the storefront. Reads only — every table the storefront
 * touches has a public SELECT policy (see Admin/supabase/migrations), and the
 * service-role key stays in the Admin app.
 *
 * Null when the env vars are missing so the site still renders (with its
 * fallback content) on a machine that has no Supabase credentials.
 */
export const supabase = url && anonKey ? createClient(url, anonKey) : null;
