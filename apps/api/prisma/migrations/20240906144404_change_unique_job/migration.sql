/*
  Warnings:

  - A unique constraint covering the columns `[jobbank_link_id,is_lmia]` on the table `Job` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Job_jobbank_link_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "Job_jobbank_link_id_is_lmia_key" ON "Job"("jobbank_link_id", "is_lmia");
