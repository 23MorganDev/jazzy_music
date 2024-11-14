import express from 'express';
import {addNewArtist,getAllArtists, getTopArtists, getArtistDetails } from '../controllers/artistController.js';

const router = express.Router();


router.post("/add", addNewArtist);
router.get("/all", getAllArtists);
router.get("/top", getTopArtists); 
router.get("/:id", getArtistDetails); 

export { router as artistRouter };
