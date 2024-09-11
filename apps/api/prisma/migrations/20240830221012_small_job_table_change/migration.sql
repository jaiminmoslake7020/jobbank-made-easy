/*
  Warnings:

  - Added the required column `employment_type` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "employment_type" VARCHAR(255) NOT NULL;
