import Artist from "../models/Artist.js";
import Song from "../models/Song.js";

// Get all artists
const getAllArtists = async (req, res) => {
  try {
    const artistes = await Artist.find();
    if (artistes.length === 0) {
      return res.status(404).json({ message: "No artists found!" });
    }
    return res.status(200).json(artistes);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};

// Get top artists
const getTopArtists = async (req, res) => {
  try {
    const topArtists = await Artist.find().sort({ popularity: -1 }).limit(10);
    if (topArtists.length === 0) {
      return res.status(404).json({ message: "Top artists not found!" });
    }
    return res.status(200).json(topArtists);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};

// Get individual artist details
const getArtistDetails = async (req, res) => {
  const { id } = req.params;
  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) { 
      return res.status(400).json({ message: "Invalid artist ID format!" });
    }

    const individualArtistDetails = await Artist.findById(id);
    if (!individualArtistDetails) {
      return res.status(404).json({ message: "Requested artist details could not be found!" });
    }
    return res.status(200).json(individualArtistDetails);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};


export { getAllArtists, getTopArtists, getArtistDetails };
