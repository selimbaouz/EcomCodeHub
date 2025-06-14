/*
  Warnings:

  - A unique constraint covering the columns `[promoCodeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "User_promoCodeId_key" ON "User"("promoCodeId");
