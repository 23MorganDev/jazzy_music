import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true, 
    },
    description: {
      type: String,
    },
    songs: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Song",
      required: true, 
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true, 
      default: "Playlist",
    },
  },
  { timestamps: true }
);

const Playlist = mongoose.model("Playlist", PlaylistSchema);

export default Playlist;
