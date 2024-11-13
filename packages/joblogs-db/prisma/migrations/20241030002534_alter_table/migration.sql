/*
  Warnings:

  - You are about to drop the column `interviewTypeId` on the `JobResponseType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobResponseType" DROP CONSTRAINT "JobResponseType_interviewTypeId_fkey";

-- AlterTable
ALTER TABLE "JobApplicationResponses" ADD COLUMN     "interviewTypeId" INTEGER;

-- AlterTable
ALTER TABLE "JobResponseType" DROP COLUMN "interviewTypeId";

-- AddForeignKey
ALTER TABLE "JobApplicationResponses" ADD CONSTRAINT "JobApplicationResponses_interviewTypeId_fkey" FOREIGN KEY ("interviewTypeId") REFERENCES "InterviewType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
