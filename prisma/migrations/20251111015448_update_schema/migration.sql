/*
  Warnings:

  - You are about to drop the column `jumlah` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `kategori` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `kodeBarang` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `kondisi` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `nama` on the `barang` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `barang` table. All the data in the column will be lost.
  - Added the required column `category` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Barang` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Barang` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Barang_kodeBarang_key` ON `barang`;

-- AlterTable
ALTER TABLE `barang` DROP COLUMN `jumlah`,
    DROP COLUMN `kategori`,
    DROP COLUMN `kodeBarang`,
    DROP COLUMN `kondisi`,
    DROP COLUMN `nama`,
    DROP COLUMN `status`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL,
    ADD COLUMN `location` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;
