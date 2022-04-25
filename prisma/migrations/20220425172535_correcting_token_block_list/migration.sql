/*
  Warnings:

  - You are about to drop the `TokenBlockList` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "TokenBlockList";

-- CreateTable
CREATE TABLE "tokenBlock" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "tokenBlock_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tokenBlock_token_key" ON "tokenBlock"("token");
