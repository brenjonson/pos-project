-- AlterTable
ALTER TABLE `Stock_In` ADD COLUMN `cancelNote` VARCHAR(191) NULL,
    ADD COLUMN `canceledAt` DATETIME(3) NULL,
    ADD COLUMN `canceledBy` INTEGER NULL,
    ADD COLUMN `isCanceled` BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE `Stock_In` ADD CONSTRAINT `Stock_In_canceledBy_fkey` FOREIGN KEY (`canceledBy`) REFERENCES `Employee`(`empID`) ON DELETE SET NULL ON UPDATE CASCADE;
