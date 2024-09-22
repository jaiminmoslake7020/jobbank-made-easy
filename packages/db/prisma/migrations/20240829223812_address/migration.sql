-- AlterTable
ALTER TABLE "Job" ADD COLUMN     "address_locality" TEXT,
ADD COLUMN     "address_region" TEXT,
ADD COLUMN     "postal_code" TEXT,
ADD COLUMN     "street_address" TEXT;
