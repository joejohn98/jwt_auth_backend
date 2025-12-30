import express from "express";
import { allMovies } from "../controllers/movieController";

const router = express.Router();

router.get("/", allMovies);

export default router;
