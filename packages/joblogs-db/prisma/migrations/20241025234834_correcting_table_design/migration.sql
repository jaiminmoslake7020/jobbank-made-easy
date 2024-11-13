/*
  Warnings:

  - You are about to drop the column `jobApplicationId` on the `JobResponseType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobResponseType" DROP CONSTRAINT "JobResponseType_interviewTypeId_fkey";

-- DropForeignKey
ALTER TABLE "JobResponseType" DROP CONSTRAINT "JobResponseType_jobApplicationId_fkey";

-- AlterTable
ALTER TABLE "JobResponseType" DROP COLUMN "jobApplicationId",
ALTER COLUMN "interviewTypeId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "JobSource" ADD COLUMN     "seenViaJobSourceId" INTEGER;

-- CreateTable
CREATE TABLE "JobApplicationResponses" (
    "id" SERIAL NOT NULL,
    "jobApplicationId" INTEGER NOT NULL,
    "jobResponseTypeId" INTEGER NOT NULL,

    CONSTRAINT "JobApplicationResponses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobResponseType" ADD CONSTRAINT "JobResponseType_interviewTypeId_fkey" FOREIGN KEY ("interviewTypeId") REFERENCES "InterviewType"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationResponses" ADD CONSTRAINT "JobApplicationResponses_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationResponses" ADD CONSTRAINT "JobApplicationResponses_jobResponseTypeId_fkey" FOREIGN KEY ("jobResponseTypeId") REFERENCES "JobResponseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
