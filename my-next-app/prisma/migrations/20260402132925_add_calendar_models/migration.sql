-- CreateEnum
CREATE TYPE "Campus" AS ENUM ('NAKAMOZU', 'SUGIMOTO', 'MORINOMIYA', 'OUTSIDE', 'ONLINE');

-- CreateEnum
CREATE TYPE "Period" AS ENUM ('PERIOD_1', 'PERIOD_2', 'LUNCH', 'PERIOD_3', 'PERIOD_4', 'PERIOD_5', 'AFTER_SCHOOL');

-- CreateTable
CREATE TABLE "Club" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT NOT NULL,
    "twitterUrl" TEXT,
    "instagramUrl" TEXT,
    "hashtags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Club_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WelcomeInfo" (
    "id" SERIAL NOT NULL,
    "clubId" INTEGER NOT NULL,
    "scheduleImage" TEXT,
    "scheduleText" TEXT,

    CONSTRAINT "WelcomeInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WelcomeEvent" (
    "id" SERIAL NOT NULL,
    "welcomeInfoId" INTEGER NOT NULL,
    "campus" "Campus" NOT NULL,

    CONSTRAINT "WelcomeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventSchedule" (
    "id" SERIAL NOT NULL,
    "welcomeEventId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "isWeekend" BOOLEAN NOT NULL,
    "periods" "Period"[],
    "hours" INTEGER[],

    CONSTRAINT "EventSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "WelcomeInfo_clubId_key" ON "WelcomeInfo"("clubId");

-- AddForeignKey
ALTER TABLE "WelcomeInfo" ADD CONSTRAINT "WelcomeInfo_clubId_fkey" FOREIGN KEY ("clubId") REFERENCES "Club"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WelcomeEvent" ADD CONSTRAINT "WelcomeEvent_welcomeInfoId_fkey" FOREIGN KEY ("welcomeInfoId") REFERENCES "WelcomeInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventSchedule" ADD CONSTRAINT "EventSchedule_welcomeEventId_fkey" FOREIGN KEY ("welcomeEventId") REFERENCES "WelcomeEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
