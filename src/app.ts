import express from "express";
import cors from "cors";
import morgan from "morgan";

import movieRouter from "./routes/movieRouter";


const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running...!");
});

app.use("/api/v1/movies", movieRouter);


export default app;
