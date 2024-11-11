import mongoose from "mongoose";

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  coverImage: {
    type: String,
    default: "Image",
  },
  artists: { 
    type: [String], 
    default: [],
  },
  artistIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
    },
  ],
  likes: {
    type: Map,
    of: Boolean,
    default: {}, 
  },
  songUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: "Song",
  },
}, { timestamps: true }); 

const Song = mongoose.model("Song", SongSchema);
export default Song;
