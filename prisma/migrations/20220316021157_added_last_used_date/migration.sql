/*
  Warnings:

  - Added the required column `lastUsed` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Link` ADD COLUMN `lastUsed` DATETIME(3) NOT NULL;
