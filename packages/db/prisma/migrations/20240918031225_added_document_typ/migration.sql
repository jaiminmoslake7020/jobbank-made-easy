-- AlterTable
ALTER TABLE "User" ADD COLUMN     "mail_text" TEXT;

-- CreateTable
CREATE TABLE "DocumentType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "DocumentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDocument" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "s3Key" VARCHAR(255) NOT NULL,
    "default" BOOLEAN NOT NULL DEFAULT false,
    "document_type_id" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserDocument_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_document_type_id_fkey" FOREIGN KEY ("document_type_id") REFERENCES "DocumentType"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserDocument" ADD CONSTRAINT "UserDocument_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
