const http = require('http');

function checkRoute(path, cookie = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: 'GET',
      headers: {
        ...(cookie ? { 'Cookie': cookie } : {})
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          location: res.headers.location,
          headers: res.headers,
          data: data.slice(0, 500)
        });
      });
    });

    req.on('error', (err) => reject(err));
    req.end();
  });
}

async function runTests() {
  console.log('====================================================');
  console.log('RUNNING LEARN-2-HIRE AUTHENTICATION ROUTING AUDIT');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`[PASS] ${name}`);
      passed++;
    } catch (err) {
      console.error(`[FAIL] ${name}: ${err.message}`);
      failed++;
    }
  }

  // 1. Root route without auth -> 307 redirect to /login
  await test('Root (/) redirects unauthenticated visitor to /login', async () => {
    const res = await checkRoute('/');
    if (res.statusCode !== 307 || !res.location.endsWith('/login')) {
      throw new Error(`Expected 307 redirect to /login, got status ${res.statusCode} location ${res.location}`);
    }
  });

  // 2. Protected route /dashboard without auth -> 307 redirect to /login?next=%2Fdashboard
  await test('Protected route /dashboard redirects unauthenticated visitor to /login?next=/dashboard', async () => {
    const res = await checkRoute('/dashboard');
    if (res.statusCode !== 307 || !res.location.includes('/login?next=')) {
      throw new Error(`Expected 307 redirect to /login?next=..., got status ${res.statusCode} location ${res.location}`);
    }
  });

  // 3. Protected route /assessment without auth -> 307 redirect to /login?next=%2Fassessment
  await test('Protected route /assessment redirects to /login?next=%2Fassessment', async () => {
    const res = await checkRoute('/assessment');
    if (res.statusCode !== 307 || !res.location.includes('/login?next=')) {
      throw new Error(`Expected 307 redirect to /login?next=..., got status ${res.statusCode} location ${res.location}`);
    }
  });

  // 4. Protected route /projects without auth -> 307 redirect to /login?next=%2Fprojects
  await test('Protected route /projects redirects to /login?next=%2Fprojects', async () => {
    const res = await checkRoute('/projects');
    if (res.statusCode !== 307 || !res.location.includes('/login?next=')) {
      throw new Error(`Expected 307 redirect to /login?next=..., got status ${res.statusCode} location ${res.location}`);
    }
  });

  // 5. Public route /login -> 200 OK
  await test('Public route /login returns 200 OK', async () => {
    const res = await checkRoute('/login');
    if (res.statusCode !== 200) {
      throw new Error(`Expected 200 OK, got ${res.statusCode}`);
    }
  });

  // 6. Public route /signup -> 307 redirect to /login?tab=signup
  await test('Public route /signup redirects to /login?tab=signup', async () => {
    const res = await checkRoute('/signup');
    if (res.statusCode !== 307 || !res.location.includes('/login?tab=signup')) {
      throw new Error(`Expected 307 redirect to /login?tab=signup, got status ${res.statusCode} location ${res.location}`);
    }
  });

  // 7. Public route /auth/error -> 200 OK
  await test('Public route /auth/error returns 200 OK', async () => {
    const res = await checkRoute('/auth/error');
    if (res.statusCode !== 200) {
      throw new Error(`Expected 200 OK, got ${res.statusCode}`);
    }
  });

  // 8. Public robots.txt -> 200 OK
  await test('Public robots.txt returns 200 OK and disallows private routes', async () => {
    const res = await checkRoute('/robots.txt');
    if (res.statusCode !== 200) {
      throw new Error(`Expected 200 OK, got ${res.statusCode}`);
    }
    if (!res.data.includes('Disallow: /dashboard')) {
      throw new Error(`Expected robots.txt to disallow /dashboard, got: ${res.data}`);
    }
  });

  // 9. Conceptual alias /career-discovery -> redirects to /onboarding
  await test('Conceptual alias /career-discovery redirects to /onboarding', async () => {
    const res = await checkRoute('/career-discovery');
    if (res.statusCode !== 307 || !res.location.endsWith('/onboarding')) {
      throw new Error(`Expected 307 redirect to /onboarding, got status ${res.statusCode} location ${res.location}`);
    }
  });

  console.log('\n====================================================');
  console.log(`SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
