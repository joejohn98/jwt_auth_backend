import mongoose from "mongoose";
import { Request, Response } from "express";

import Movie from "../models/movieModel";
import {
  createMovieSchema,
  updateMovieSchema,
} from "../validators/movie.schema";

const allMovies = async (req: Request, res: Response) => {
  const userId = (req as any).user.id;

  try {
    const movies = await Movie.find({ userId: userId })
      .select("-__v")
      .sort("-createdAt");
    res
      .status(200)
      .json({ status: "success", results: movies.length, data: movies });
  } catch (error) {
    console.log("failed to fetch movies", error);
    res
      .status(500)
      .json({ status: "failed", message: "failed to fetch movies" });
  }
};

const addMovie = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  const { title, description, director, releaseYear, genre, rating } = req.body;

  const validate = createMovieSchema.safeParse(req.body);

  if (!validate.success) {
    res.status(400).json({
      status: "failed",
      message: validate.error?.issues[0]?.message || "Validation failed",
    });
    return;
  }
  try {
    const newMovie = await Movie.create({
      title,
      description,
      director,
      releaseYear,
      genre,
      rating,
      userId: userId,
    } as any);

    res.status(201).json({
      status: "success",
      message: "movie added successfully",
      data: newMovie,
    });
  } catch (error) {
    console.log("error to add movie", error);
    res.status(500).json({
      status: "failed",
      message: "failed to add movie",
    });
  }
};

const updateMovie = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: "failed",
      message: "Invalid movie id",
    });
    return;
  }

  const validate = updateMovieSchema.safeParse(req.body);

  if (!validate.success) {
    res.status(400).json({
      status: "failed",
      message: validate.error?.issues[0]?.message || "Validation failed",
    });
    return;
  }

  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMovie) {
      res.status(404).json({ status: "failed", message: "movie not found" });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "movie updated successfully",
      data: updatedMovie,
    });
  } catch (error) {
    console.log("error to update movie", error);
    res.status(500).json({
      status: "failed",
      message: "failed to update movie",
    });
  }
};

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: "failed",
      message: "Invalid movie id",
    });
    return;
  }
  try {
    const deltedMovie = await Movie.findOneAndDelete({ _id: id, userId });
    if (!deltedMovie) {
      res.status(404).json({
        status: "failed",
        message: "movie not found",
      });
      return;
    }
    res.status(200).json({
      status: "success",
      message: "movie deleted successfully",
    });
  } catch (error) {
    console.log("error to delete movie", error);
    res.status(500).json({
      status: "failed",
      message: "failed to delete movie",
    });
  }
};

export { allMovies, addMovie, updateMovie, deleteMovie };
