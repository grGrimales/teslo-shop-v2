/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `OrderAddress` table. All the data in the column will be lost.
  - Added the required column `rememberAddress` to the `OrderAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "transactionId",
ALTER COLUMN "isPaid" DROP DEFAULT;

-- AlterTable
ALTER TABLE "OrderAddress" DROP COLUMN "userId",
ADD COLUMN     "rememberAddress" BOOLEAN NOT NULL;
