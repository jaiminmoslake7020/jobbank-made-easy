/*
  Warnings:

  - Added the required column `date` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `JobResponseType` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JobResponseType" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
