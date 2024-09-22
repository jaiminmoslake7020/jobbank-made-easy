/*
  Warnings:

  - You are about to drop the `JobAdditionalQuetsions` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "JobAdditionalQuetsions" DROP CONSTRAINT "JobAdditionalQuetsions_job_id_fkey";

-- DropTable
DROP TABLE "JobAdditionalQuetsions";

-- CreateTable
CREATE TABLE "JobAdditionalQuestions" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "job_id" INTEGER NOT NULL,

    CONSTRAINT "JobAdditionalQuestions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobAdditionalQuestions" ADD CONSTRAINT "JobAdditionalQuestions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
