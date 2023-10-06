import express from "express";
import {
    getBuku,
    getBukuByid,
    saveBuku,
    updateBuku,
    deleteBuku
} from "../controllers/BukuControllers.js";

const router = express.Router();

router.get('/buku', getBuku);
router.get('/buku/:id', getBukuByid);
router.post('/buku', saveBuku);
router.patch('/buku/:id', updateBuku);
router.delete('/buku/:id', deleteBuku);

export default router;