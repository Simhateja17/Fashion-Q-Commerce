import cron from "node-cron";
import { getPendingOrders, processOrder } from "./order_processing";

// Run every 5 minutes to process pending orders
task = cron.schedule("*/5 * * * *", async () => {
  console.log("Running background task: Processing orders...");
  const pendingOrders = await getPendingOrders();
  
  for (const order of pendingOrders) {
    await processOrder(order);
  }

  console.log("Order processing completed.");
});

export default task;
