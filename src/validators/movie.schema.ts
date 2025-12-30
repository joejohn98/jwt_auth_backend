import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, "Title is required"),
  director: z.string().min(1, "Director is required"),
  releaseYear: z.number().int().min(1900),
  rating: z.number().min(0).max(10).optional()
});

export const updateMovieSchema = z.object({
  title: z.string().optional(),
  director: z.string().optional(),
  releaseYear: z.number().int().optional(),
  rating: z.number().min(0).max(10).optional()
});
