/*
  Warnings:

  - You are about to alter the column `name` on the `Company` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `CompanySize` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `CompanySize` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `Industry` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `company_name` on the `Job` table. All the data in the column will be lost.
  - You are about to drop the column `required_items_unknown` on the `Job` table. All the data in the column will be lost.
  - You are about to alter the column `unit_text` on the `JobWage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `work_hours` on the `JobWage` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to drop the column `item_name` on the `RequiredItem` table. All the data in the column will be lost.
  - You are about to alter the column `search_string` on the `Search` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `location_string` on the `Search` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `filter_string` on the `Search` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `WageUnit` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - A unique constraint covering the columns `[name]` on the table `RequiredItem` will be added. If there are existing duplicate values, this will fail.
  - Made the column `company_id` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address_locality` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address_region` on table `Job` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `name` to the `RequiredItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Job" DROP CONSTRAINT "Job_company_id_fkey";

-- DropIndex
DROP INDEX "RequiredItem_item_name_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "CompanySize" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Industry" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "Job" DROP COLUMN "company_name",
DROP COLUMN "required_items_unknown",
ALTER COLUMN "company_id" SET NOT NULL,
ALTER COLUMN "address_locality" SET NOT NULL,
ALTER COLUMN "address_region" SET NOT NULL;

-- AlterTable
ALTER TABLE "JobWage" ALTER COLUMN "unit_text" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "work_hours" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "RequiredItem" DROP COLUMN "item_name",
ADD COLUMN     "name" VARCHAR(255) NOT NULL;

-- AlterTable
ALTER TABLE "Search" ALTER COLUMN "search_string" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "location_string" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "filter_string" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "WageUnit" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255);

-- CreateTable
CREATE TABLE "JobAdditionalQuetsions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "JobAdditionalQuetsions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RequiredItem_name_key" ON "RequiredItem"("name");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobAdditionalQuetsions" ADD CONSTRAINT "JobAdditionalQuetsions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
