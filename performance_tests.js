import autocannon from "autocannon";

async function runPerformanceTest() {
  const result = await autocannon({
    url: "http://localhost:5000/create-order",
    connections: 50, // Simulating 50 concurrent users
    duration: 10, // Test duration in seconds
    method: "POST",
    body: JSON.stringify({ userId: "testUser", items: [{ name: "T-Shirt", quantity: 1, price: 499 }] }),
    headers: { "Content-Type": "application/json" }
  });
  console.log(result);
}

runPerformanceTest();
