import express from "express";
import { getAllBarang, getBarangById, createBarang, updateBarang, deleteBarang } from "../controller/barang.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.midddleware.js";

const router = express.Router();

router.get("/", getAllBarang);
router.get("/:id", getBarangById);

router.post("/", verifyToken, isAdmin, createBarang);
router.put("/:id", verifyToken, isAdmin, updateBarang);
router.delete("/:id", verifyToken, isAdmin, deleteBarang);

export default router;