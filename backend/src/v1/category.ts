import { Hono } from "hono";
import { newCategorySchema } from "../schema";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const categoryRoute = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

categoryRoute.post("/create", async (c) => {
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
    console.log(e)
    return c.json({
      msg: "Something went wrong while creating category",
    }, 400);
  } finally {
    await prisma.$disconnect();
  }
});
