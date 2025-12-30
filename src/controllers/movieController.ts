import mongoose from "mongoose";
import { Request, Response } from "express";

import Movie from "../models/movieModel";

const allMovies = async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find().select("-__v").sort("-createdAt");
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
  const { title, description, director, releaseYear, genre, rating } = req.body;

  if (!title || !description || !director || !releaseYear) {
    res.status(400).json({
      status: "failed",
      message: "All fields are required",
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
    });

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
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: "failed",
      message: "Invalid movie id",
    });
    return;
  }
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

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
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({
      status: "failed",
      message: "Invalid movie id",
    });
    return;
  }
  try {
    const deltedMovie = await Movie.findByIdAndDelete(id);
    if (!deltedMovie) {
      res.status(404).json({
        status: "failed",
        message: "movie not found",
      });
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
