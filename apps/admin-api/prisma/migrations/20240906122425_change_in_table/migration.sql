/*
  Warnings:

  - You are about to drop the column `results` on the `Search` table. All the data in the column will be lost.
  - You are about to drop the column `results_processed` on the `Search` table. All the data in the column will be lost.
  - You are about to drop the `JobSearch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobSearch" DROP CONSTRAINT "JobSearch_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobSearch" DROP CONSTRAINT "JobSearch_search_id_fkey";

-- AlterTable
ALTER TABLE "Search" DROP COLUMN "results",
DROP COLUMN "results_processed";

-- DropTable
DROP TABLE "JobSearch";

-- CreateTable
CREATE TABLE "JobSearchResults" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "jobbank_link_id" INTEGER NOT NULL,
    "is_lmia" BOOLEAN NOT NULL,
    "job_id" INTEGER NOT NULL,
    "search_id" INTEGER NOT NULL,

    CONSTRAINT "JobSearchResults_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JobSearchResults_jobbank_link_id_key" ON "JobSearchResults"("jobbank_link_id");

-- AddForeignKey
ALTER TABLE "JobSearchResults" ADD CONSTRAINT "JobSearchResults_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobSearchResults" ADD CONSTRAINT "JobSearchResults_search_id_fkey" FOREIGN KEY ("search_id") REFERENCES "Search"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
