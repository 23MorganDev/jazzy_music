import mongoose from "mongoose";

const SongSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, "Duration is required!"],
    },
    coverImage: {
      type: String,
      default: "https://pixabay.com/illustrations/cartoon-drawing-manga-comic-5190942/", 
    },
    artists: {
      type: [String], // Array of artist names
      default: [],
    },
    artistIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artist", // Reference the Artist model
      },
    ],
    likes: {
      type: Map,
      of: Boolean, // Key: userId, Value: true/false
      default: {},
    },
    songUrl: {
      type: String,
      required: [true, "Song URL is required!"],
    },
    type: {
      type: String,
      default: "Song",
    },
  },
  { timestamps: true }
);

const Song = mongoose.model("Song", SongSchema);

export default Song;
