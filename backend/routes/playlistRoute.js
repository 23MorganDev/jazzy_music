import express from "express";
import {
  getAllPlaylists,
  getPlaylist,
  createPlaylist,
  editPlaylist,
} from "../controllers/playListController.js";

import verifyToken from "../middleware/authToken.js";

const router = express.Router();

router.get("/", getAllPlaylists);
router.get("/:id", getPlaylist);
router.post("/create", verifyToken, createPlaylist);
router.patch("/:id", verifyToken, editPlaylist);

export { router as playlistRouter };
