/*
  Warnings:

  - You are about to drop the column `employment_type` on the `JobDetail` table. All the data in the column will be lost.
  - You are about to drop the column `hourly_wage` on the `JobDetail` table. All the data in the column will be lost.
  - You are about to drop the column `wage_string` on the `JobDetail` table. All the data in the column will be lost.
  - You are about to drop the column `weekly_hours_range` on the `JobDetail` table. All the data in the column will be lost.
  - You are about to drop the column `work_setting` on the `JobDetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "JobDetail" DROP COLUMN "employment_type",
DROP COLUMN "hourly_wage",
DROP COLUMN "wage_string",
DROP COLUMN "weekly_hours_range",
DROP COLUMN "work_setting";
