import { z } from "zod";

export const newCategorySchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
})