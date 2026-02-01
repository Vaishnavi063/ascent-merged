import { z } from "zod";

export const taskShema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(100, {
      message: "Title must not be longer than 100 characters.",
    }),
  description: z.string(),
  status: z.enum(["TODO", "IN_PROGRESS", "UNDER_REVIEW", "COMPLETED"], {
    message: "Status is invalid",
  }),
  taskType: z.string({ message: "Task type is required" }),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"], {
    message: "Priority is invalid",
  }),
  dueDate: z.date({
    message: "Due date must be a valid date.",
  }),
});

export type TaskValues = z.infer<typeof taskShema>;
