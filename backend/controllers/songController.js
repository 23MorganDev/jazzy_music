import Song from "../models/Song.js";
import User from "../models/User.js";

// Get all songs
const getAllSongs = async (req, res) => {
  try {
    const allSongs = await Song.find({});
    if (!allSongs || allSongs.length === 0) {
      return res.status(404).json({ message: "No songs found!" });
    }
    res.status(200).json(allSongs);
  } catch (error) {
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Get top songs
const getTopSongs = async (req, res) => {
  try {
    const topSongs = await Song.aggregate([
      {
        $project: {
          title: 1,
          duration: 1,
          coverImage: 1,
          artistes: 1,
          songUrl: 1,
          artistIds: 1,
          type: 1,
          likeCount: { $size: { $objectToArray: "$likes" } }, // Calculate like count
        },
      },
      { $sort: { likeCount: -1 } },
      { $limit: 5 },
    ]);

    if (topSongs.length === 0) {
      return res.status(404).json({ message: "No top songs found!" });
    }
    res.status(200).json(topSongs);
  } catch (error) {
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Get new song releases
const getNewSongReleases = async (req, res) => {
  try {
    const newSongReleases = await Song.find({}).sort({ releaseDate: -1 }).limit(11);
    if (newSongReleases.length === 0) {
      return res.status(404).json({ message: "No new releases found!" });
    }

    // Shuffle the songs
    const shuffledSongs = newSongReleases.sort(() => Math.random() - 0.5);
    res.status(200).json(shuffledSongs);
  } catch (error) {
    console.error("Error fetching new song releases:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Get random songs
const getRandomSongs = async (req, res) => {
  try {
    const randomSongs = await Song.find({});
    if (randomSongs.length === 0) {
      return res.status(404).json({ message: "No songs found!" });
    }

    // Shuffle and get the last 10 songs
    const shuffledSongs = randomSongs.sort(() => Math.random() - 0.5);
    const result = shuffledSongs.slice(0, 10); // Slice the first 10 after shuffle

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching random songs:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Get popular songs
const getPopularSongs = async (req, res) => {
  try {
    const popularSongs = await Song.find({});
    if (popularSongs.length === 0) {
      return res.status(404).json({ message: "No popular songs found!" });
    }


    const recentPopularSongs = popularSongs.slice(0, 10);
    const shuffledSongs = recentPopularSongs.sort(() => Math.random() - 0.5);

    res.status(200).json(shuffledSongs);
  } catch (error) {
    console.error("Error fetching popular songs:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Like or unlike a song
const songLike = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    // Fetch song and user details
    const likedSong = await Song.findById(id);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User could not be found!" });
    }

    if (!likedSong) {
      return res.status(404).json({ message: "Song could not be found!" });
    }

    // Check if the song is already liked
    const isLiked = likedSong.likes.get(userId);

    if (isLiked) {
      likedSong.likes.delete(userId);
      user.favorites = user.favorites.filter((songId) => songId !== id); 
    } else {
      likedSong.likes.set(userId, true); // Add like
      user.favorites.push(id); // Add to favorites
    }

    await likedSong.save();
    await user.save();

    res.status(200).json({
      message: isLiked ? "Song unliked successfully" : "Song liked successfully",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error toggling song like:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

export {
  getAllSongs,
  getTopSongs,
  getNewSongReleases,
  getRandomSongs,
  getPopularSongs,
  songLike,
};
