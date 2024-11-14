import Song from "../models/Song.js";
import User from "../models/User.js";
import Artist from "../models/Artist.js";

//add new song

const addSong = async (req, res) => {
  const { title, duration, coverImage, artists, artistIds, likes, songUrl } =
    req.body;

  //filed validation

  if (!title || !songUrl || !duration) {
    res
      .status(400)
      .json({ message: "Please fill in all the required fields!" });
  }

  try {
    //check if all the artist IDS are valid

    if (artistIds && artistIds.length > 0) {
      const validArtists = await Artist.find({ _id: { $in: artistIds } });
      if (validArtists.length !== artistIds.length) {
        return res
          .status(400)
          .json({ message: "some artist ids are not valid!" });
      }
    }
    // Create and save the new song
    const newSong = new Song({
      title,
      duration,
      coverImage,
      artists,
      artistIds,
      songUrl,
    });
    await newSong.save();

    return res
      .status(201)
      .json({ message: "Song added successfully!", song: newSong });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

//get all songs
const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().populate("artistIds", "name image");
    if (songs.length === 0) {
      return res.status(404).json({ message: "No songs found!" });
    }
    return res.status(200).json(songs);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

// Get song by ID
const getSongById = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid song ID format!" });
    }

    const song = await Song.findById(id).populate("artistIds", "name image");
    if (!song) {
      return res.status(404).json({ message: "Song not found!" });
    }

    return res.status(200).json(song);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

// Like or unlike a song
const likeSong = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required!" });
  }

  try {
    const song = await Song.findById(id);
    if (!song) {
      return res.status(404).json({ message: "Song not found!" });
    }

    // Toggle the like status
    const isLiked = song.likes.get(userId);
    if (isLiked) {
      song.likes.delete(userId);
    } else {
      song.likes.set(userId, true);
    }

    await song.save();
    return res
      .status(200)
      .json({
        message: isLiked ? "Song unliked!" : "Song liked!",
        likes: song.likes.size,
      });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

// Update song details
const updateSong = async (req, res) => {
  const { id } = req.params;
  const { title, duration, coverImage, artists, artistIds, songUrl } = req.body;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid song ID format!" });
    }

    const updatedSong = await Song.findByIdAndUpdate(
      id,
      { title, duration, coverImage, artists, artistIds, songUrl },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ message: "Song not found!" });
    }

    return res
      .status(200)
      .json({ message: "Song updated successfully!", song: updatedSong });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

//delete a song

const deleteSong = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid song ID format!" });
    }

    const deletedSong = await Song.findByIdAndDelete(id);

    if (!deletedSong) {
      return res.status(404).json({ message: "Song not found!" });
    }

    return res.status(200).json({ message: "Song deleted successfully!" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "An internal error occurred.", error: error.message });
  }
};

export {
  addSong,
  getAllSongs,
  getSongById,
  updateSong,
  likeSong,
  deleteSong,
};
