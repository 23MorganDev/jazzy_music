import express from 'express';
import { getAllArtists, getTopArtists, getArtistDetails } from '../controllers/artistController.js';

const router = express.Router();

router.get("/all", getAllArtists);
router.get("/top", getTopArtists); 
router.get("/:id", getArtistDetails); 

export { router as artistRouter };
