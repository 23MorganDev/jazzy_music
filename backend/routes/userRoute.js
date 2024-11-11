import express from "express";
import {
  registerUser,
  userlogin,
  getUserFavorite,
} from "../controllers/userController.js";

import verifyToken from "../middleware/authToken.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", userlogin);
router.get("/favorites", verifyToken, getUserFavorite);

export { router as userRouter };
