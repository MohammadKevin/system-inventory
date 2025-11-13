import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const borrowItem = async (req, res) => {
try {
    const { user_id, item_id, borrow_date, return_date } = req.body;

    if (!user_id || !item_id || !borrow_date || !return_date) {
        return res.status(400).json({
            status: "error",
            message:"Semua field wajib diisi (user_id, item_id, borrow_date, return_date)",
        });
    }
    const barang = await prisma.barang.findUnique({
        where: { id: Number(item_id) },
    });

    if (!barang) {
        return res.status(404).json({
        status: "error",
        message: "Barang tidak ditemukan",
        });
    }

    const peminjaman = await prisma.peminjaman.create({
        data: {
            userId: Number(user_id),
            itemId: Number(item_id),
            borrowDate: new Date(borrow_date),
            returnDate: new Date(return_date),
        },
        include: {
            user: true,
            barang: true,
        },
    });
    
    res.status(201).json({
        status: "success",
        message: "Peminjaman berhasil dicatat",
        data: {
        borrow_id: peminjaman.id,
        user_id: peminjaman.userId,
        item_id: peminjaman.itemId,
        borrow_date: peminjaman.borrowDate,
        return_date: peminjaman.returnDate,
        },
    });
    } catch (error) {
    console.error("Error borrowItem:", error);
    res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan server",
        error: error.message,
    });
    }
};
export const returnItem = async (req, res) => {
try {
    const { borrow_id, return_date } = req.body;

    if (!borrow_id || !return_date) {
        return res.status(400).json({
            status: "error",
            message: "Field borrow_id dan return_date wajib diisi",
        });
    }

    const peminjaman = await prisma.peminjaman.findUnique({
        where: { id: Number(borrow_id) },
    });

    if (!peminjaman) {
        return res.status(404).json({
            status: "error",
            message: "Data peminjaman tidak ditemukan",
        });
    }

    if (peminjaman.status === "DIKEMBALIKAN") {
        return res.status(400).json({
            status: "error",
            message: "Barang ini sudah dikembalikan sebelumnya",
        });
    }
    const updatedPeminjaman = await prisma.peminjaman.update({
        where: { id: Number(borrow_id) },
        data: {
            status: "DIKEMBALIKAN",
            returnDate: new Date(return_date),
        },
    }); 
    res.status(200).json({
        status: "success",
        message: "Barang berhasil dikembalikan",
        data: {
            borrow_id: updatedPeminjaman.id,
            item_id: peminjaman.itemId,
            user_id: peminjaman.userId,
            return_date: updatedPeminjaman.tanggalDikembalikan,
        },
    });
    } catch (error) {
    console.error("Error returnItem:", error);
    res.status(500).json({
        status: "error",
        message: "Terjadi kesalahan server",
        error: error.message,
        });
    }
};