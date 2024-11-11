import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Song from "../models/Song.js";

// Register user
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill in all the required info!" });
    }

    // Check if username already exists
    const duplicateUsernameExist = await User.findOne({ username });
    if (duplicateUsernameExist) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 8);

    // Create the new user
    const newUser = new User({
      username,
      password: hashedPassword,
    });


    const savedUser = await newUser.save();
    if (!savedUser) {
      return res.status(500).json({ message: "Error occurred when trying to create a user!" });
    }

    // Generate JWT token for the new user
    const accessToken = jwt.sign(
      {
        user: {
          id: savedUser.id,
          username: savedUser.username,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const returnedUser = {
      id: savedUser.id,
      username: savedUser.username,
      favorites: savedUser.favorites || [],
      playlists: savedUser.playlists || [],
    };

    return res.status(201).json({ user: returnedUser, token: accessToken });

  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "An internal error occurred!" });
  }
};

// User login
const userlogin = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ message: "Please fill all the required fields!" });
    }

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User could not be found!" });
    }

    // Check if the password matches
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect username or password!" });
    }

    // Generate JWT token for the logged-in user
    const accessToken = jwt.sign(
      {
        user: {
          id: user.id,
          username: user.username,
        },
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );


    const returnedUser = {
      id: user.id,
      username: user.username,
      favorites: user.favorites || [],
      playlists: user.playlists || [],  
    };

    return res.status(200).json({ user: returnedUser, token: accessToken });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

// Get user favorites
const getUserFavorite = async (req, res) => {
  const { id } = req.user; 

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(400).json({ message: "User could not be found!" });
    }

    // Fetch the user's favorite songs
    const userFavorites = await Promise.all(
      user.favorites.map((songId) => Song.findById(songId))
    );

    return res.status(200).json(userFavorites);
  } catch (error) {
    console.error("User favorites fetch error:", error);
    res.status(500).json({ message: "An internal error occurred!" });
  }
};

export { registerUser, userlogin, getUserFavorite };
