/*
  Warnings:

  - Added the required column `company_size_id` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "company_size_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "company_id" INTEGER,
ADD COLUMN     "job_wage_id" INTEGER;

-- CreateTable
CREATE TABLE "JobWage" (
    "id" SERIAL NOT NULL,
    "min_value" DOUBLE PRECISION NOT NULL,
    "max_value" DOUBLE PRECISION,
    "unit_text" TEXT NOT NULL,
    "wage_id" INTEGER NOT NULL,

    CONSTRAINT "JobWage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WageUnit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "WageUnit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompanySize" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "CompanySize_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WageUnit_name_key" ON "WageUnit"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CompanySize_name_key" ON "CompanySize"("name");

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Job" ADD CONSTRAINT "Job_job_wage_id_fkey" FOREIGN KEY ("job_wage_id") REFERENCES "JobWage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobWage" ADD CONSTRAINT "JobWage_wage_id_fkey" FOREIGN KEY ("wage_id") REFERENCES "WageUnit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_company_size_id_fkey" FOREIGN KEY ("company_size_id") REFERENCES "CompanySize"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
