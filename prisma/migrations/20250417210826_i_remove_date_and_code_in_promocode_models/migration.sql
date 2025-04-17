/*
  Warnings:

  - You are about to drop the column `credits` on the `PromoCode` table. All the data in the column will be lost.
  - You are about to drop the column `expiresAt` on the `PromoCode` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "PromoCode" DROP COLUMN "credits",
DROP COLUMN "expiresAt";
