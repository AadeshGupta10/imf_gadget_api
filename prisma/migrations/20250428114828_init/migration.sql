-- CreateEnum
CREATE TYPE "GadgetStatus" AS ENUM ('Available', 'Deployed', 'Destroyed', 'Decommissioned');

-- CreateTable
CREATE TABLE "gadgets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "status" "GadgetStatus" NOT NULL DEFAULT 'Available',
    "decommissionedAt" TEXT NOT NULL DEFAULT '',

    CONSTRAINT "gadgets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
