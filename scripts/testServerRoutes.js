async function testRoutes() {
  const routes = [
    "/assessment",
    "/assessment/results",
    "/problem-solving",
  ];

  console.log("Testing SkillForge Next.js server endpoints...");
  for (const route of routes) {
    try {
      const res = await fetch(`http://localhost:3000${route}`);
      console.log(`[ROUTE] ${route.padEnd(25)} -> Status: ${res.status} ${res.statusText}`);
      if (res.status !== 200) {
        console.error(`Route ${route} returned non-200 status.`);
      }
    } catch (err) {
      console.error(`Error connecting to route ${route}:`, err.message);
    }
  }
}

testRoutes();
