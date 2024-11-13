/*
  Warnings:

  - Added the required column `salaryMentionedType` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SalaryType" AS ENUM ('HOURLY', 'MONTHLY', 'ANNUALLY');

-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "salaryMentionedType" "SalaryType" NOT NULL;
