import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import barangRoutes from "./routes/barang.routes.js";
import peminjamanRoutes from "./routes/peminjaman.routes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/inventory", barangRoutes);
app.use("/api/inventory", peminjamanRoutes);


app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});