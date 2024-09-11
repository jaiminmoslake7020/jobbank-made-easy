/*
  Warnings:

  - You are about to alter the column `location` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `website` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `location` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `work_type_situation` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `how_to_apply_email` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address_locality` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `address_region` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `postal_code` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `street_address` on the `Job` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `job_application_proof` on the `JobApplication` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `employment_type` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `wage_string` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `hourly_wage` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `weekly_hours_range` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `sort_string` on the `Search` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "location" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "website" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Job" ALTER COLUMN "location" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "work_type_situation" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "how_to_apply_email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address_locality" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "address_region" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "postal_code" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "street_address" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "JobApplication" ALTER COLUMN "job_application_proof" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "JobDetail" ALTER COLUMN "employment_type" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "wage_string" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "hourly_wage" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "weekly_hours_range" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Search" ALTER COLUMN "sort_string" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);
