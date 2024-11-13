/*
  Warnings:

  - You are about to drop the column `jobLinkId` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `jobLink` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "jobLinkId",
ADD COLUMN     "jobLink" VARCHAR(1024) NOT NULL;
