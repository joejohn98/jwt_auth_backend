import express from "express";
import cors from "cors";
import morgan from "morgan";

import movieRouter from "./routes/movieRouter";
import authRouter from "./routes/authRouter";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...!");
});

app.use("/api/v1/movies", movieRouter);

app.use("/api/v1/auth", authRouter);

export default app;
