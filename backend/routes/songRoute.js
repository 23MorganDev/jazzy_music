import express from "express";
import {
  getAllSongs,
  getTopSongs,
  getNewSongReleases,
  getRandomSongs,
  getPopularSongs,
  songLike,
} from "../controllers/songController.js";

import verifyToken from "../middleware/authToken.js";
const router = express.Router();

router.get("/", getAllSongs);
router.get("/top", getTopSongs);
router.get("/releases", getNewSongReleases);
router.get("/random", getRandomSongs);
router.get("/popular", getPopularSongs);
router.patch("/like/:id", verifyToken, songLike);

export { router as songsRouter };
