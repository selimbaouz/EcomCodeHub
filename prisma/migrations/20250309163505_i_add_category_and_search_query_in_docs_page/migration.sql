/*
  Warnings:

  - You are about to drop the column `categories` on the `Snippet` table. All the data in the column will be lost.
  - You are about to drop the column `userName` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'BUYER', 'CREATOR');

-- DropIndex
DROP INDEX "User_userName_key";

-- AlterTable
ALTER TABLE "Snippet" DROP COLUMN "categories",
ADD COLUMN     "categoryId" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userName",
ADD COLUMN     "role" "UserRole" NOT NULL DEFAULT 'BUYER';

-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Snippet" ADD CONSTRAINT "Snippet_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
