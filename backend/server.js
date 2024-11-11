import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { songsRouter } from "./routes/songRoute.js";
import { userRouter } from "./routes/userRoute.js";
import { playlistRouter } from "./routes/playlistRoute.js";
import { artistRouter } from "./routes/artistRoute.js";
import DBConnect from "./config/DbConfig.js"

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

DBConnect();

app.use("/backend/users", userRouter);
app.use("/backend/playlist", playlistRouter);
app.use("/backend/songs", songsRouter);
app.use("/backend/artists", artistRouter);

const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`SERVER CONNECTED IN PORT: ${port}`);
});
