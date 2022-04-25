-- CreateTable
CREATE TABLE "TokenBlockList" (
    "id" SERIAL NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "TokenBlockList_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TokenBlockList_token_key" ON "TokenBlockList"("token");
