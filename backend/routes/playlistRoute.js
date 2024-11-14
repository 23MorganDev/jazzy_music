import express from "express";
import {
  addNewPlaylist,
  getAllPlaylists,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} from "../controllers/playListController.js";

const router = express.Router();

router.post("/add", addNewPlaylist);
router.get("/", getAllPlaylists);
router.get("/:id", getPlaylistById);
router.patch("/:id", updatePlaylist);
router.delete("/:id", deletePlaylist);

export { router as playlistRouter };
