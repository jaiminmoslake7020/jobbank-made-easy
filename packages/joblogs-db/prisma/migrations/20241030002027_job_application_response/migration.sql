/*
  Warnings:

  - You are about to drop the column `date` on the `JobResponseType` table. All the data in the column will be lost.
  - Added the required column `postedDate` to the `JobApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `JobApplicationResponses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" ADD COLUMN     "companyId" INTEGER,
ADD COLUMN     "postedDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JobApplicationResponses" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "JobResponseType" DROP COLUMN "date";

-- AddForeignKey
ALTER TABLE "JobApplication" ADD CONSTRAINT "JobApplication_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;
