/*
  Warnings:

  - A unique constraint covering the columns `[name,location,industry_id]` on the table `Company` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Company_name_location_industry_id_key" ON "Company"("name", "location", "industry_id");
