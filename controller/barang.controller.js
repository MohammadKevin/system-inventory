import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getAllBarang = async (req, res) => {
try {
    const barangs = await prisma.barang.findMany();
    res.status(200).json(barangs);
} catch (error) {
    console.error("Error fetching barang:", error);
    res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};

export const getBarangById = async (req, res) => {
    const { id } = req.params;
    try {
        const barang = await prisma.barang.findUnique({
            where: { id: parseInt(id) },
        });
        if (!barang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }
        res.status(200).json(barang);
    } catch (error) {
        console.error("Error fetching barang by ID:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
};

export const createBarang = async (req, res) => {
try {
    const { name, category, location, quantity } = req.body;
    if (!name || !category || !location || quantity == null) {
        return res.status(400).json({
        message: "Semua field (name, category, location, quantity) wajib diisi",
        });
    }
    const newBarang = await prisma.barang.create({
        data: {
            name,
            category,
            location,
            quantity: parseInt(quantity),
        },
    });

    res.status(201).json({
        status: "success",
        message: "Barang berhasil ditambahkan",
        data: {
            id: newBarang.id,
            name: newBarang.name,
            category: newBarang.category,
            location: newBarang.location,
            quantity: newBarang.quantity,
        },
    });
} catch (error) {
    console.error("Error creating barang:", error);
    res.status(500).json({
        message: "Terjadi kesalahan server",
        error: error.message,
    });
    }
};

export const updateBarang = async (req, res) => {
    const { id } = req.params;
    const { name, category, location, quantity } = req.body;
    try {
        const existingBarang = await prisma.barang.findUnique({
            where: { id: parseInt(id) },
        });
        if (!existingBarang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }

        const updatedBarang = await prisma.barang.update({
            where: { id: parseInt(id) },
            data: {
                name: name || existingBarang.name,
                category: category || existingBarang.category,
                location: location || existingBarang.location,
                quantity: quantity != null ? parseInt(quantity) : existingBarang.quantity,
            },
        });

        res.status(200).json({
            status: "success",
            message: "Barang berhasil diperbarui",
            data: {
                id: updatedBarang.id,
                name: updatedBarang.name,
                category: updatedBarang.category,
                location: updatedBarang.location,
                quantity: updatedBarang.quantity,
            },
        });
    } catch (error) {
        console.error("Error updating barang:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
}

export const deleteBarang = async (req, res) => {
    const { id } = req.params;
    try {
        const existingBarang = await prisma.barang.findUnique({
            where: { id: parseInt(id) },
        });
        if (!existingBarang) {
            return res.status(404).json({ message: "Barang tidak ditemukan" });
        }

        await prisma.barang.delete({
            where: { id: parseInt(id) },
        });

        res.status(200).json({
            status: "success",
            message: "Barang berhasil dihapus",
        });
    } catch (error) {
        console.error("Error deleting barang:", error);
        res.status(500).json({ message: "Terjadi kesalahan server", error: error.message });
    }
}