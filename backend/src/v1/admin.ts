import { Hono } from "hono";
import { loginSchema, newCategorySchema } from "../schema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "jsonwebtoken";
import { use } from "hono/jsx";

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
        msg: "Invalid Username or password",
      },
      400
    );
  }
  const token = sign(user, c.env.JWT_SECRET)
  localStorage.setItem(token, token)
  return c.json({
    msg: "Log in succesful",
  });
});
