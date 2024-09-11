-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_company_size_id_fkey";

-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_industry_id_fkey";

-- DropForeignKey
ALTER TABLE "JobAdditionalQuetsions" DROP CONSTRAINT "JobAdditionalQuetsions_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobDetail" DROP CONSTRAINT "JobDetail_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobRequiredItem" DROP CONSTRAINT "JobRequiredItem_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobRequiredItem" DROP CONSTRAINT "JobRequiredItem_required_item_id_fkey";

-- DropForeignKey
ALTER TABLE "JobSearch" DROP CONSTRAINT "JobSearch_job_id_fkey";

-- DropForeignKey
ALTER TABLE "JobWage" DROP CONSTRAINT "JobWage_job_id_fkey";

-- AddForeignKey
ALTER TABLE "JobAdditionalQuetsions" ADD CONSTRAINT "JobAdditionalQuetsions_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobWage" ADD CONSTRAINT "JobWage_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobDetail" ADD CONSTRAINT "JobDetail_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_industry_id_fkey" FOREIGN KEY ("industry_id") REFERENCES "Industry"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_company_size_id_fkey" FOREIGN KEY ("company_size_id") REFERENCES "CompanySize"("id") ON DELETE RESTRICT ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobRequiredItem" ADD CONSTRAINT "JobRequiredItem_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobRequiredItem" ADD CONSTRAINT "JobRequiredItem_required_item_id_fkey" FOREIGN KEY ("required_item_id") REFERENCES "RequiredItem"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "JobSearch" ADD CONSTRAINT "JobSearch_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
