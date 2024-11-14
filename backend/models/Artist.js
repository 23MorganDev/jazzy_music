import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  type: {
    type: String,
    required: true,
    default: "Artist",
  },
  bio: {
    type: String, 
  },
});

const Artist = mongoose.model("Artist", ArtistSchema);
export default Artist;
