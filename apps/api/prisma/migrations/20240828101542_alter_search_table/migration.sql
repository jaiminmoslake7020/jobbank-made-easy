-- AlterTable
ALTER TABLE "Search" ADD COLUMN     "results" TEXT,
ADD COLUMN     "results_processed" BOOLEAN DEFAULT false,
ADD COLUMN     "sort_string" TEXT;
