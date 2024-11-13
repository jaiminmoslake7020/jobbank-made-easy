/*
  Warnings:

  - You are about to drop the column `job_link_id` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `jobLinkId` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "job_link_id",
ADD COLUMN     "jobLinkId" VARCHAR(1024) NOT NULL;
