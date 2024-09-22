/*
  Warnings:

  - The `auth_token_expiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gmail_access_token_expiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `google_login_token_expiry` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "auth_token_expiry",
ADD COLUMN     "auth_token_expiry" TIMESTAMP(3),
DROP COLUMN "gmail_access_token_expiry",
ADD COLUMN     "gmail_access_token_expiry" TIMESTAMP(3),
DROP COLUMN "google_login_token_expiry",
ADD COLUMN     "google_login_token_expiry" TIMESTAMP(3);
