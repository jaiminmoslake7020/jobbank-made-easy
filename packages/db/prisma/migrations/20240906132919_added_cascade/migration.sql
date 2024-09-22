-- DropForeignKey
ALTER TABLE "JobSearchResults" DROP CONSTRAINT "JobSearchResults_search_id_fkey";

-- AddForeignKey
ALTER TABLE "JobSearchResults" ADD CONSTRAINT "JobSearchResults_search_id_fkey" FOREIGN KEY ("search_id") REFERENCES "Search"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
