-- CreateTable
CREATE TABLE "JobResponseType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "jobApplicationId" INTEGER NOT NULL,
    "interviewTypeId" INTEGER NOT NULL,

    CONSTRAINT "JobResponseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(10) NOT NULL,

    CONSTRAINT "InterviewType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "JobResponseType" ADD CONSTRAINT "JobResponseType_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "JobApplication"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobResponseType" ADD CONSTRAINT "JobResponseType_interviewTypeId_fkey" FOREIGN KEY ("interviewTypeId") REFERENCES "InterviewType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
