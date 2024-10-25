-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "google_login_token" VARCHAR(1024),
    "auth_token" VARCHAR(1024),
    "refresh_google_login_token" VARCHAR(1024),
    "google_login_token_expiry" BIGINT,
    "auth_token_expiry" BIGINT,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
