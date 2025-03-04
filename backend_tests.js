import request from "supertest";
import app from "../backend_setup";

describe("Backend API Tests", () => {
  it("should return a running server message", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Fashion Quick Commerce API is running");
  });
  
  it("should create an order successfully", async () => {
    const orderData = { userId: "testUser", items: [{ name: "T-Shirt", quantity: 1, price: 499 }] };
    const res = await request(app).post("/create-order").send(orderData);
    expect(res.status).toBe(200);
    expect(res.body.order_id).toBeDefined();
  });
  
  it("should return an error for unauthorized API request", async () => {
    const res = await request(app).get("/track-order/12345");
    expect(res.status).toBe(401);
  });
});
