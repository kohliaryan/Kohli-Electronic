import { Hono } from "hono";
import { cors } from "hono/cors";
import { adminRouter } from "./v1/admin";

const app = new Hono();

// Add CORS middleware
app.use("*", cors());

app.get("/", (c) => {
  return c.text("Welcome to Kohli Electronics");
});

app.route("/v1/admin", adminRouter);

export default app;
