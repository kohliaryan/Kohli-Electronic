import { Hono } from "hono";
import { loginSchema, newCategorySchema } from "../schema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { jwtVerify, SignJWT } from "jose";

export const adminRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

adminRouter.post("/create", async (c) => {
  const body = await c.req.json();
  const response = newCategorySchema.safeParse(body);

  if (!response.success) {
    return c.json(
      {
        msg: "Invalid Inputs",
      },
      400
    );
  }
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    await prisma.category.create({
      data: {
        name: body.name,
        description: body.description,
      },
    });
    return c.json(
      {
        msg: "Created Succesfully",
        category: body,
      },
      201
    );
  } catch (e) {
    return c.json(
      {
        msg: "Something went wrong while creating category",
      },
      400
    );
  } finally {
    await prisma.$disconnect();
  }
});

adminRouter.post("/login", async (c) => {
  const body = await c.req.json();
  const response = loginSchema.safeParse(body);
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  if (!response.success) {
    return c.json(
      {
        msg: "Invalid Inputs",
      },
      400
    );
  }

  const user = await prisma.admin.findFirst({
    where: {
      username: body.name,
      password: body.password,
    },
  });

  if (!user) {
    return c.json(
      {
        msg: "Invalid Username or Password",
      },
      400
    );
  }
  const token = await new SignJWT({ id: user.id, username: user.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("1h")
    .sign(new TextEncoder().encode(c.env.JWT_SECRET));
  return c.json({
    msg: "Login successful",
    token: token,
  });
});

adminRouter.get("/verify", async (c) => {
  const token: string = c.req.header("auth")?.split(" ")[1] || "";

  try {
    await jwtVerify(token, new TextEncoder().encode(c.env.JWT_SECRET));

    return c.json({
      valid: true,
    });
  } catch {
    return c.json(
      {
        valid: false,
      },
      400
    );
  }
});
