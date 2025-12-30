import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  director: z.string().min(1, "Director is required"),
  releaseYear: z.number().int().min(1900),
  genre: z.string().optional(),
  rating: z.number().min(0).max(10).optional()
});

export const updateMovieSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  director: z.string().optional(),
  releaseYear: z.number().int().optional(),
  genre: z.string().optional(),
  rating: z.number().min(0).max(10).optional()
});
