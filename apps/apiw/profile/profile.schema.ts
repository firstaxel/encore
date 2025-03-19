import { z } from 'zod';

export const profileSchema = z.object({
  id: z.string().uuid(),
  fullName: z.string().min(2).max(100),
  username: z.string().min(3).max(30),
  email: z.string().email(),
  phone: z.string().optional(),
  bio: z.string().max(500).optional(),

  skills: z.array(z.string()).min(1),
  experienceLevel: z.enum(['Beginner', 'Intermediate', 'Expert']),
  portfolio: z.array(z.string().url()).optional(),
  hourlyRate: z.number().min(0).optional(),

  categories: z.array(z.string()).min(1),
  availability: z.boolean(),
  location: z.string().optional(),
  languages: z.array(z.string()),

  rating: z.number().min(0).max(5).default(0),
  reviewsCount: z.number().int().min(0).default(0),

  isVerified: z.boolean().default(false),
  socialLinks: z.array(z.string().url()).optional(),
  createdAt: z.date(),
});

// Interfaces and Types

export type ProfileDataSchema = z.infer<typeof profileSchema>;
