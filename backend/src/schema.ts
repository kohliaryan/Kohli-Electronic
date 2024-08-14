import { z } from "zod";

export const newCategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
})

export const loginSchema = z.object({
    name: z.string().min(1),
    password: z.string().min(8)
})