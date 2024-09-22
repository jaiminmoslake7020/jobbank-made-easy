/*
  Warnings:

  - A unique constraint covering the columns `[jobbank_link_id,is_lmia]` on the table `JobSearchResults` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "JobSearchResults_jobbank_link_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "JobSearchResults_jobbank_link_id_is_lmia_key" ON "JobSearchResults"("jobbank_link_id", "is_lmia");
