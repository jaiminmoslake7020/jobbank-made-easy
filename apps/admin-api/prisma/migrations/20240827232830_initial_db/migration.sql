/*
  Warnings:

  - Made the column `name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ALTER COLUMN "name" SET NOT NULL;

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "jobbank_link_id" INTEGER NOT NULL,
    "jobbank_id" INTEGER NOT NULL,
    "posted_on" TIMESTAMP(3) NOT NULL,
    "last_date_to_apply" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "number_of_vacancies" INTEGER NOT NULL,
    "location" TEXT NOT NULL,
    "work_type_situation" TEXT NOT NULL,
    "is_lmia" BOOLEAN NOT NULL,
    "how_to_apply_email" TEXT NOT NULL,
    "required_items_unknown" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobDetail" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "employment_type" TEXT NOT NULL,
    "wage_string" TEXT NOT NULL,
    "hourly_wage" TEXT NOT NULL,
    "weekly_hours_range" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "experience" TEXT NOT NULL,
    "asset_languages" TEXT NOT NULL,
    "work_setting" TEXT NOT NULL,

    CONSTRAINT "JobDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Industry" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,

    CONSTRAINT "Industry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "number_of_operating_locations" INTEGER NOT NULL,
    "industry_id" INTEGER NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobRequiredItem" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "required_item_id" INTEGER NOT NULL,

    CONSTRAINT "JobRequiredItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplication" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "job_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "job_application_proof" TEXT NOT NULL,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobApplicationAddedItem" (
    "id" SERIAL NOT NULL,
    "job_application_id" INTEGER NOT NULL,
    "added_item_id" INTEGER NOT NULL,

    CONSTRAINT "JobApplicationAddedItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RequiredItem" (
    "id" SERIAL NOT NULL,
    "item_name" TEXT NOT NULL,

    CONSTRAINT "RequiredItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "search_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "search_string" TEXT NOT NULL,
    "location_string" TEXT NOT NULL,
    "filter_string" TEXT NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobSearch" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "job_id" INTEGER NOT NULL,
    "search_id" INTEGER NOT NULL,

    CONSTRAINT "JobSearch_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExcludedJobSearch" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "reason" TEXT NOT NULL,
    "search_id" INTEGER NOT NULL,
    "jobbank_link_id" INTEGER NOT NULL,
    "jobbank_id" INTEGER NOT NULL,

    CONSTRAINT "ExcludedJobSearch_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobbank_link_id_key" ON "Job"("jobbank_link_id");

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobbank_id_key" ON "Job"("jobbank_id");

-- CreateIndex
CREATE UNIQUE INDEX "Industry_name_key" ON "Industry"("name");

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "Industry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRequiredItem" ADD CONSTRAINT "JobRequiredItem_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobRequiredItem" ADD CONSTRAINT "JobRequiredItem_required_item_id_fkey" FOREIGN KEY ("required_item_id") REFERENCES "RequiredItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationAddedItem" ADD CONSTRAINT "JobApplicationAddedItem_job_application_id_fkey" FOREIGN KEY ("job_application_id") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobApplicationAddedItem" ADD CONSTRAINT "JobApplicationAddedItem_added_item_id_fkey" FOREIGN KEY ("added_item_id") REFERENCES "RequiredItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSearch" ADD CONSTRAINT "JobSearch_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobSearch" ADD CONSTRAINT "JobSearch_search_id_fkey" FOREIGN KEY ("search_id") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExcludedJobSearch" ADD CONSTRAINT "ExcludedJobSearch_search_id_fkey" FOREIGN KEY ("search_id") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
