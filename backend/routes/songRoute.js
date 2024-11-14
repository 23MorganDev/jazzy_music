import express from "express";
import {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  likeSong,
  deleteSong,
} from "../controllers/songController.js";

const router = express.Router();

router.post("/add", addSong);
router.get("/all", getAllSongs);
router.get("/:id", getSongById);
router.get("/:id/update", updateSong);
router.patch("/:id/like", likeSong);
router.delete("/:id/delete", deleteSong);

export { router as songsRouter };
