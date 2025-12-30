import express from "express";
import {
  addMovie,
  allMovies,
  deleteMovie,
  updateMovie,
} from "../controllers/movieController";
import protect from "../middlewares/auth";

const router = express.Router();

router.get("/", allMovies);

router.post("/", protect, addMovie);

router.put("/:id", protect, updateMovie);

router.delete("/:id", protect, deleteMovie);

export default router;
