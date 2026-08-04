/*=========================================
ATP BUSINESS PORTAL
Supabase Configuration
=========================================*/

const SUPABASE_URL =
"https://urbgmiisuairbztyxlme.supabase.co";

const SUPABASE_ANON_KEY =
"sb_publishable_qwvChr3tfz_STlgfioQ-Pg_wwLW3dD5";

// Create client
const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_ANON_KEY
);

console.log("✅ Supabase Connected");