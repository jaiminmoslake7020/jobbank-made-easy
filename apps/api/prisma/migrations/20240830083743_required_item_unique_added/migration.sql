/*
  Warnings:

  - A unique constraint covering the columns `[item_name]` on the table `RequiredItem` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "RequiredItem_item_name_key" ON "RequiredItem"("item_name");
