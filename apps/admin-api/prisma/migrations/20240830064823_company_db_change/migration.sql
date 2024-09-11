-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_industry_id_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "industry_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "Industry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
