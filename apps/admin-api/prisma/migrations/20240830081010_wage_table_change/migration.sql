/*
  Warnings:

  - You are about to drop the column `job_wage_id` on the `Job` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_job_wage_id_fkey";

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "job_wage_id";

-- AlterTable
ALTER TABLE "JobWage" ADD COLUMN     "job_id" INTEGER;

-- AddForeignKey
ALTER TABLE "JobWage" ADD CONSTRAINT "JobWage_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE SET NULL ON UPDATE CASCADE;
