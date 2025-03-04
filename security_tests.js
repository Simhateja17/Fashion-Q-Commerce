import request from "supertest";
import app from "../backend_setup";

describe("Security Tests", () => {
  it("should prevent SQL injection in login", async () => {
    const res = await request(app).post("/otp-login").send({ phoneNumber: "' OR 1=1 --" });
    expect(res.status).toBe(400);
  });
  
  it("should block unauthorized API access", async () => {
    const res = await request(app).post("/create-order").send({ userId: "maliciousUser" });
    expect(res.status).toBe(401);
  });
  
  it("should enforce rate limiting on login", async () => {
    for (let i = 0; i < 10; i++) {
      await request(app).post("/otp-login").send({ phoneNumber: "+911234567890" });
    }
    const res = await request(app).post("/otp-login").send({ phoneNumber: "+911234567890" });
    expect(res.status).toBe(429);
  });
});
