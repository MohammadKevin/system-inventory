import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  try {
    const { username, password, role } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username sudah digunakan" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { 
        username, 
        password: hashedPassword,
        role: role?.toUpperCase() || "USER"
      },
    });

    res.status(201).json({
      message: "Register berhasil, silakan login",
      data: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error register:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Username dan password wajib diisi" });
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Username atau password salah" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET || "rahasia_super",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      status: "success",
      message: "Login berhasil",
      token,
    });
  } catch (error) {
    console.error("Error login:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
  }
};