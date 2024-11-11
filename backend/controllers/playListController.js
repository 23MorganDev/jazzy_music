import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import User from "../models/User.js";

// Get all playlists
const getAllPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({});
    if (!Array.isArray(playlists) || playlists.length === 0) {
      return res.status(404).json({ message: "No playlists found!" });
    }
    return res.status(200).json(playlists);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Create a playlist
const createPlaylist = async (req, res) => {
  const { id } = req.user;
  const { title, description, isPrivate, songIds } = req.body;

  try {
    if (!title || !songIds || songIds.length === 0) {
      return res.status(400).json({ message: "Title and at least one song are required!" });
    }

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Verify all song IDs are valid
    const songs = await Song.find({ _id: { $in: songIds } });
    const invalidSongs = songIds.filter(id => !songs.some(song => song._id.toString() === id));
    if (invalidSongs.length > 0) {
      return res.status(404).json({
        message: `Songs not found for IDs: ${invalidSongs.join(", ")}`,
      });
    }

    // Create the playlist
    const newPlaylist = await Playlist.create({
      title,
      description,
      isPrivate,
      songs: songIds,
      user: id,
    });

    // Add the playlist to the user's list of playlists
    user.playlist.push(newPlaylist._id);
    await user.save();

    return res.status(201).json({
      message: "Playlist created successfully",
      playlist: newPlaylist,
    });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred!", error: error.message });
  }
};

// Get the playlist
const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    // Fetch all songs associated with the playlist
    const songs = [];
    const missingSongs = [];
    await Promise.all(
      playlist.songs.map(async (songId) => {
        const playlistSong = await Song.findById(songId);
        if (!playlistSong) {
          missingSongs.push(songId);
        } else {
          songs.push(playlistSong);
        }
      })
    );

    if (missingSongs.length > 0) {
      return res.status(206).json({
        message: "Some songs could not be found.",
        missingSongs,
        playlist: { ...playlist.toObject(), songs },
      });
    }

    return res.status(200).json({ ...playlist.toObject(), songs });
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};

// Edit a playlist
const editPlaylist = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  const { title, description, songIds } = req.body;

  try {
    if (!title || !songIds || songIds.length === 0) {
      return res.status(400).json({ message: "All fields are required!" });
    }

    const playlist = await Playlist.findById(id);
    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found!" });
    }

    if (playlist.user.toString() !== userId) {
      return res.status(403).json({
        message: "You are not allowed to edit other users' playlists!",
      });
    }

    // Validate song IDs
    const songs = await Song.find({ _id: { $in: songIds } });
    const missingSongs = songIds.filter(id => !songs.some(song => song._id.toString() === id));

    if (missingSongs.length > 0) {
      return res.status(404).json({
        message: "Some songs could not be found.",
        missingSongs,
      });
    }

    // Update the playlist
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
      id,
      { title, description, songs: songIds },
      { new: true }
    );

    if (!updatedPlaylist) {
      return res.status(500).json({ message: "Failed to update playlist." });
    }

    res.status(200).json(updatedPlaylist);
  } catch (error) {
    return res.status(500).json({ message: "An internal error occurred.", error: error.message });
  }
};

export { getAllPlaylists, createPlaylist, getPlaylist, editPlaylist };
