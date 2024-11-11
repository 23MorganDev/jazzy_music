import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization") || req.header("authorization");

    if (!token) {
      return res
        .status(403)
        .json({ message: "Authorization token missing or invalid" });
    }

    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    } else {
      return res
        .status(401)
        .json({ message: "Invalid token format, expected 'Bearer <token>'" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid auth token" });
      }
      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default verifyToken;
