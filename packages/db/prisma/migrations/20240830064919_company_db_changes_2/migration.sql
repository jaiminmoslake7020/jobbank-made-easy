-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_company_size_id_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "number_of_operating_locations" DROP NOT NULL,
ALTER COLUMN "company_size_id" DROP NOT NULL,
ALTER COLUMN "website" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_company_size_id_fkey" FOREIGN KEY ("company_size_id") REFERENCES "CompanySize"("id") ON DELETE SET NULL ON UPDATE CASCADE;
