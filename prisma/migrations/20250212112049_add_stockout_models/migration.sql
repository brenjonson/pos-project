-- CreateTable
CREATE TABLE `StockOut` (
    `stockOutID` INTEGER NOT NULL AUTO_INCREMENT,
    `stockOutDate` DATETIME(3) NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `note` VARCHAR(191) NULL,
    `empID` INTEGER NOT NULL,

    PRIMARY KEY (`stockOutID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StockOutDetail` (
    `stockOutDetailID` INTEGER NOT NULL AUTO_INCREMENT,
    `ingredientName` VARCHAR(191) NOT NULL,
    `quantity` DOUBLE NOT NULL,
    `unit` VARCHAR(191) NOT NULL,
    `pricePerUnit` DOUBLE NOT NULL,
    `totalPrice` DOUBLE NOT NULL,
    `stockOutID` INTEGER NOT NULL,
    `stockID` INTEGER NOT NULL,

    PRIMARY KEY (`stockOutDetailID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `StockOut` ADD CONSTRAINT `StockOut_empID_fkey` FOREIGN KEY (`empID`) REFERENCES `Employee`(`empID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockOutDetail` ADD CONSTRAINT `StockOutDetail_stockOutID_fkey` FOREIGN KEY (`stockOutID`) REFERENCES `StockOut`(`stockOutID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StockOutDetail` ADD CONSTRAINT `StockOutDetail_stockID_fkey` FOREIGN KEY (`stockID`) REFERENCES `Stock`(`stockID`) ON DELETE RESTRICT ON UPDATE CASCADE;
