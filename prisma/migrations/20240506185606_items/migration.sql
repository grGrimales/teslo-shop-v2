/*
  Warnings:

  - You are about to drop the column `rememberAddress` on the `OrderAddress` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "transactionId" TEXT,
ALTER COLUMN "isPaid" SET DEFAULT false;

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "rememberAddress";
