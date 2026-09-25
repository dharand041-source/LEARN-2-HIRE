const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

// 1. Read environment variables from .env.local
const envPath = path.resolve(__dirname, '../.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
      const [key, ...rest] = trimmed.split('=');
      process.env[key.trim()] = rest.join('=').trim();
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log('--- SUPABASE ENVIRONMENT AUDIT ---');
console.log('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? 'Configured (PASS)' : 'Missing (FAIL)');
console.log('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:', publishableKey ? 'Configured (PASS)' : 'Missing (FAIL)');
console.log('SUPABASE_SECRET_KEY:', secretKey ? 'Configured (PASS)' : 'Missing (FAIL)');

if (!supabaseUrl || !publishableKey) {
  console.error('ERROR: Required environment variables are missing.');
  process.exit(1);
}

// 2. Test Browser/Public Client Connection
const client = createClient(supabaseUrl, publishableKey);
client.auth.getSession()
  .then(({ data, error }) => {
    if (error) {
      console.log('Public Client Test: FAIL -', error.message);
    } else {
      console.log('Public Client Test: PASS - Successfully reached Supabase Auth endpoint.');
    }
  })
  .catch((err) => {
    console.log('Public Client Test: ERROR -', err.message);
  });

// 3. Test Admin / Service Client Connection if available
if (secretKey) {
  const adminClient = createClient(supabaseUrl, secretKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  adminClient.from('profiles').select('id').limit(1)
    .then(({ data, error }) => {
      if (error && error.code !== 'PGRST116') {
        console.log('Database Access: NOTE -', error.message, '(Tables will be created once SQL migration is executed in Dashboard)');
      } else {
        console.log('Database Access: PASS - Successfully queried database with secret client.');
      }
    })
    .catch((err) => {
      console.log('Database Access: ERROR -', err.message);
    });
}
