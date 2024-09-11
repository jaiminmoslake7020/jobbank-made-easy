-- DropForeignKey
ALTER TABLE "JobWage" DROP CONSTRAINT "JobWage_wage_id_fkey";

-- AlterTable
ALTER TABLE "JobWage" ALTER COLUMN "wage_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "JobWage" ADD CONSTRAINT "JobWage_wage_id_fkey" FOREIGN KEY ("wage_id") REFERENCES "WageUnit"("id") ON DELETE SET NULL ON UPDATE CASCADE;
