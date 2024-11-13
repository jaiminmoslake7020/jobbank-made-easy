/*
  Warnings:

  - You are about to drop the column `additionalInfo` on the `JobApplicationMedium` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "mediumAdditionalInfo" VARCHAR(1024);

-- AlterTable
ALTER TABLE "JobApplicationMedium" DROP COLUMN "additionalInfo";
