/*
  Warnings:

  - The primary key for the `TimeScription` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `TimeScriptionID` to the `TimeScription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `TimeScription` DROP PRIMARY KEY,
    ADD COLUMN `TimeScriptionID` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`TimeScriptionID`);

-- CreateIndex
CREATE INDEX `TimeScription_Employee_empID_idx` ON `TimeScription`(`Employee_empID`);

-- RedefineIndex
CREATE INDEX `TimeScription_Stock_stockID_idx` ON `TimeScription`(`Stock_stockID`);
DROP INDEX `TimeScription_Stock_stockID_fkey` ON `TimeScription`;
