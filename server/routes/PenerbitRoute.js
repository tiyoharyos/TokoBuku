import express from "express";
import { getPenerbit, getPenerbitID, createPenerbit, updatePenerbit, detelePenerbit } from "../controllers/PenerbitController.js";

const router = express.Router();

router.get('/penerbit', getPenerbit);
router.get('/penerbit/:id', getPenerbitID);
router.post('/penerbit/', createPenerbit);
router.patch('/penerbit/:id', updatePenerbit);
router.delete('/penerbit/:id', detelePenerbit);
export default router;
