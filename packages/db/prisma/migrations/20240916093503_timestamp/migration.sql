-- AlterTable
ALTER TABLE "User" ADD COLUMN     "refresh_gmail_access_token" VARCHAR(1024),
ADD COLUMN     "refresh_google_login_token" VARCHAR(1024);
