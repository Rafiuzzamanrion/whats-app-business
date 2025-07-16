/*
  Warnings:

  - Added the required column `price` to the `BusinessApi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BusinessApi" ADD COLUMN     "price" TEXT NOT NULL;
