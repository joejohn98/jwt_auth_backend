import express from "express";
import {
  addMovie,
  allMovies,
  updateMovie,
} from "../controllers/movieController";

const router = express.Router();

router.get("/", allMovies);

router.post("/", addMovie);

router.put("/:id", updateMovie);

router.delete("/:id", updateMovie);

export default router;
