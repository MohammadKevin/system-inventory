/*
  Warnings:

  - You are about to drop the column `barangId` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalKembali` on the `peminjaman` table. All the data in the column will be lost.
  - You are about to drop the column `tanggalPinjam` on the `peminjaman` table. All the data in the column will be lost.
  - Added the required column `itemId` to the `Peminjaman` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `peminjaman` DROP FOREIGN KEY `Peminjaman_barangId_fkey`;

-- DropIndex
DROP INDEX `Peminjaman_barangId_fkey` ON `peminjaman`;

-- AlterTable
ALTER TABLE `peminjaman` DROP COLUMN `barangId`,
    DROP COLUMN `status`,
    DROP COLUMN `tanggalKembali`,
    DROP COLUMN `tanggalPinjam`,
    ADD COLUMN `borrowDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `itemId` INTEGER NOT NULL,
    ADD COLUMN `returnDate` DATETIME(3) NULL;

-- AddForeignKey
ALTER TABLE `Peminjaman` ADD CONSTRAINT `Peminjaman_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `Barang`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
