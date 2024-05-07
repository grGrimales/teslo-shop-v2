/*
  Warnings:

  - You are about to drop the column `rememberAddress` on the `OrderAddress` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrderAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "rememberAddress",
DROP COLUMN "userId";
