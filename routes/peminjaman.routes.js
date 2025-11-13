import express from "express";
import {
  borrowItem,
  returnItem,
} from "../controller/peminjaman.controller.js";

const router = express.Router();

router.post("/borrow", borrowItem);

router.post("/return", returnItem);

export default router;