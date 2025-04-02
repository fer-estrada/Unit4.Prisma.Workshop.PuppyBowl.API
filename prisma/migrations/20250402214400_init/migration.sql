-- CreateEnum
CREATE TYPE "Status" AS ENUM ('bench', 'field');

-- CreateTable
CREATE TABLE "Players" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'bench',

    CONSTRAINT "Players_pkey" PRIMARY KEY ("id")
);
