/*
  Warnings:

  - You are about to drop the `FreelancerProfile` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[stackId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropTable
DROP TABLE "FreelancerProfile";

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "phone" TEXT,
    "bio" TEXT,
    "skills" TEXT[],
    "experienceLevel" "ExperienceLevel" NOT NULL,
    "portfolio" TEXT[],
    "hourlyRate" DOUBLE PRECISION,
    "categories" TEXT[],
    "availability" BOOLEAN NOT NULL DEFAULT true,
    "location" TEXT,
    "languages" TEXT[],
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "socialLinks" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "User_stackId_idx" ON "User"("stackId");

-- CreateIndex
CREATE UNIQUE INDEX "User_stackId_key" ON "User"("stackId");
