import { z } from "zod";

const requiredText = (label, max = 200) =>
    z.string({ error: `${label} is required` })
        .trim()
        .min(1, { error: `${label} is required` })
        .max(max, { error: `${label} must be ${max} characters or fewer` });

const nonNegativeNumber = (label) =>
    z.coerce.number({ error: `${label} must be a number` })
        .min(0, { error: `${label} cannot be negative`});

export const registerSchema = z.strictObject({
    name: requiredText("Name", 100),
    email: z.string({ error: "Email is required" })
        .trim()
        .toLowerCase()
        .check(z.email())
        .max(254, { error: "Email is too long" }),
    password: z.string({ error: "Password is required" })
        .min(8, { error: "Password must be at least 8 characters" })
        .max(128, { error: "Password must be 128 characters or fewer" }),
})

export const loginSchema = z.strictObject({
    email: z.string({ error: "Email is required" })
        .trim()
        .toLowerCase()
        .check(z.email({ error: "Email must be valid "}))
        .max(254, { error: "Email is too long" }),
    password: z.string({ error: "Password is required" })
        .min(1, { error: "Password is required" })
        .max(128, { error: "Password is too long" }),
})

const productFields = {
    name: requiredText("Name", 200),
    slug: z.string({ error: "Slug is required" })
        .trim()
        .toLowerCase()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { error: "Slug must contain only lowercase letters, numbers, and hyphens" }),
    brand: requiredText("Brand", 100),
    category: requiredText("Category", 100),
    sku: z.string().trim().max(100).default(""),
    stock: z.coerce.number({ error: "Stock must be a number" })
        .int({ error: "Stock must be a whole number" })
        .min(0, { error: "Stock cannot be negative" }),
    description: z.string().trim().max(5000).default(""),
    image: z.string().trim().max(1000).default(""),
    images: z.array(z.string().trim().min(1).max(1000)).default([]),
    price: nonNegativeNumber("Price"),
    costPrice: nonNegativeNumber("Cost price").default(0),
    originalPrice: nonNegativeNumber("Original price").default(0),
    discount: z.coerce.number({ error: "Discount must be a number" })
        .min(0, { error: "Discount cannot be negative" })
        .max(100, {error: "Discount cannot exceed 100" })
        .default(0),
    rating: z.coerce.number({ error: "Rating must be a number" })
        .min(0)
        .max(5)
        .default(0),
    reviews: z.coerce.number({ error: "Reviews must be a number" })
        .int({ error: "Reviews must be a whole number "})
        .min(0, { error: "Reviews cannot be negative" })
        .default(0),
    isBestSeller: z.boolean().default(false),
    isSale: z.boolean().default(false),
    isNewArrival: z.boolean().default(false),
};

export const createProductSchema = z.object(productFields);
export const updateProductSchema = z.object(productFields).partial();
