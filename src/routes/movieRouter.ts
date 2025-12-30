import express from "express";
import { addMovie, allMovies } from "../controllers/movieController";

const router = express.Router();

router.get("/", allMovies);

router.post("/", addMovie)

export default router;
