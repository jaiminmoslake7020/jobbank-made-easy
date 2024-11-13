/*
  Warnings:

  - You are about to drop the column `date` on the `JobApplication` table. All the data in the column will be lost.
  - Added the required column `applicationDate` to the `JobApplication` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "JobApplication" DROP COLUMN "date",
ADD COLUMN     "applicationDate" TIMESTAMP(3) NOT NULL;
