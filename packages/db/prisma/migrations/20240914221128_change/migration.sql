-- AlterTable
ALTER TABLE "User" ADD COLUMN     "auth_token" VARCHAR(1024),
ADD COLUMN     "auth_token_expiry" INTEGER,
ADD COLUMN     "gmail_access_token" VARCHAR(1024),
ADD COLUMN     "gmail_access_token_expiry" INTEGER,
ADD COLUMN     "google_login_token" VARCHAR(1024),
ADD COLUMN     "google_login_token_expiry" INTEGER;
