import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";


//add new playlist 

const addNewPlaylist = async (req, res) => {
  const {title, description, songs,owner} = req.body

  //field vaildates

  if(!title || !owner){
    res.status(401).json({message: "Please fill all the required input fields."})
  }

  //check if the owner/user exist

  try {
    const user = await User.findOne({owner})
    if(!user){
      res.status(401).json({message: "User could not be found."})
    }

    const newPlaylist = new Playlist({ title, description, songs, owner });
    await newPlaylist.save();

    return res.status(201).json({ message: "Playlist created successfully!", playlist: newPlaylist });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find().populate("songs").populate("owner", "username");
    if (playlists.length === 0) {
      return res.status(404).json({ message: "No playlists found!" });
    }
    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};


// Get playlist by ID
const getPlaylistById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid playlist ID format!" });
    }

    const playlist = await Playlist.findById(id).populate("songs").populate("owner", "username");
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    return res.status(200).json(playlist);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};


// Update playlist
const updatePlaylist = async (req, res) => {
  const { id } = req.params;
  const { title, description, songs } = req.body;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid playlist ID format!" });
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      id,
      { title, description, songs },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    return res.status(200).json({ message: "Playlist updated successfully!", playlist: updatedPlaylist });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};


// Delete playlist
const deletePlaylist = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid playlist ID format!" });
    }

    const deletedPlaylist = await Playlist.findByIdAndDelete(id);

    if (!deletedPlaylist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    return res.status(200).json({ message: "Playlist deleted successfully!" });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};


export { addNewPlaylist,getAllPlaylists,getPlaylistById, updatePlaylist, deletePlaylist };
