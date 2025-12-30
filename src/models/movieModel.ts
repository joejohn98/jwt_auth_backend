import mongoose from "mongoose";
import { title } from "node:process";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
      required: [true, "Please provide a description"],
    },
    director: {
      type: String,
      required: [true, "Please provide a director"],
    },
    genre: {
      type: String,
    },
    releaseYear: {
      type: Number,
    },
    rating: {
      type: Number,
      required: [true, "Please provide a rating"],
    },
  },
  {
    timestamps: true,
  }
);

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
