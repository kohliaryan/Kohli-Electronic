import { Hono } from "hono";
export const adminRoute = new Hono();

adminRoute.post("/login", async (c) => {
  const body = await c.req.json();
  
});
