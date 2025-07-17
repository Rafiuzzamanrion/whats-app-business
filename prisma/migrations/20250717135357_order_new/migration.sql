/*
  Warnings:

  - Added the required column `quantity` to the `BusinessApi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalPrice` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessApi" ADD COLUMN     "quantity" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "totalPrice" DOUBLE PRECISION NOT NULL;
