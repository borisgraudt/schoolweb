import { z } from "zod";

export const contactSchema = z.object({
  applicantName: z.string().min(2, "ФИО должно содержать не менее 2 символов"),
  class: z.number().min(5).max(11, "Класс должен быть от 5 до 11"),
  parentName: z.string().min(2, "ФИО родителя должно содержать не менее 2 символов"),
  email: z.string().email("Введите корректный email"),
  phone: z.string()
    .regex(/^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/, "Телефон должен быть в формате +7 (XXX) XXX XX XX"),
});

export type ContactFormData = z.infer<typeof contactSchema>; 