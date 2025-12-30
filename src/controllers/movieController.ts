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

export { allMovies };
