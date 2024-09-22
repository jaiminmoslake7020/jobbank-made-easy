/*
  Warnings:

  - You are about to alter the column `language` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `education` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `experience` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `asset_languages` on the `JobDetail` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "JobDetail" ADD COLUMN     "work_setting" VARCHAR(255),
ALTER COLUMN "language" DROP NOT NULL,
ALTER COLUMN "language" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "education" DROP NOT NULL,
ALTER COLUMN "education" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "experience" DROP NOT NULL,
ALTER COLUMN "experience" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "asset_languages" DROP NOT NULL,
ALTER COLUMN "asset_languages" SET DATA TYPE VARCHAR(255);
