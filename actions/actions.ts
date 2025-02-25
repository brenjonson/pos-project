﻿//ฟังก์ชั่นติดต่อฐานข้อมูลทั้งหมด
"use server"
import prisma from "@/utils/db";
import { StockInDetail } from "@/utils/types";
import { NextResponse } from "next/server";
import { parse } from "path";
import { StockInItem } from "@/utils/types";

export const addStock = async (formData: FormData) => {
  const ingredientName = formData.get("ingredientName")?.toString();
  const quantity = parseFloat(formData.get("quantity")?.toString() || "0");
  const unit = formData.get("unit")?.toString();
  const price = parseFloat(formData.get("price")?.toString() || "0.00");
  const minQuantity = parseFloat(formData.get("minQuantity")?.toString() || "0");
  const imageUrl = formData.get("imageUrl")?.toString();  // เพิ่มการรับค่า imageUrl

  if (!ingredientName) {
    throw new Error("รับชื่อวัตถุดิบไม่ได้");
  }
  else if (!ingredientName || quantity <= 0 || !unit || price <= 0) {
    throw new Error("ข้อมูลไม่ครบถ้วน");
  }

  // ตรวจสอบว่ามีสินค้าที่มีชื่อเหมือนกันใน Stock หรือไม่
  const existingStock = await prisma.stock.findUnique({
    where: {
      ingredientName: ingredientName,
    },
  });

  if (existingStock) {
    // ถ้ามีสินค้าอยู่แล้ว อัปเดตจำนวน
    const updatedStock = await prisma.stock.update({
      where: {
        stockID: existingStock.stockID,
      },
      data: {
        Quantity: existingStock.Quantity + quantity, // เพิ่มจำนวนสินค้า
        minQuantity: minQuantity,
        LastUpdated: new Date(), // อัปเดตเวลาล่าสุด
      },
    });
    return updatedStock;
  } else {
    // ถ้าไม่มีสินค้า ให้เพิ่มสินค้าตัวใหม่
    const newStock = await prisma.stock.create({
      data: {
        ingredientName: ingredientName,
        costPrice: price,
        Unit: unit,
        Quantity: quantity, // จำนวนสินค้าที่เพิ่ม
        minQuantity: minQuantity,
        imageUrl: imageUrl || null,
        LastUpdated: new Date(), // เวลาที่เพิ่มสินค้า
      },
    });
    return newStock;
  }
};


export async function addStockIn(formdata: FormData) {
  await prisma.stock_In.create({
    data: {
      stockInDateTime: new Date(),
      totalPrice: parseFloat(formdata.get("totalPrice") as string),
      Employee_empID: parseInt(formdata.get("empID") as string),
      note: formdata.get("note") as string,
    },
  });
}


//Stockนรกตอนนี้
export const createStockInWithDetails = async (formData: FormData) => {
  try {
      const empID = parseInt(formData.get("empID") as string);
      const totalPrice = parseFloat(formData.get("totalPrice") as string);


      if (!empID) {
          throw new Error("กรุณาเลือกพนักงาน");
      }

      // สร้าง Stock_In
      const stockIn = await prisma.stock_In.create({
          data: {
              stockInDateTime: new Date(),
              totalPrice: totalPrice,
              Employee_empID: empID,
              note: "",
          },
      });

      // แปลง items string กลับเป็น array
      const items = JSON.parse(formData.get("items") as string) as StockInItem[];

      // สร้าง Stock_In_Detail สำหรับแต่ละรายการ
      for (const item of items) {
          await prisma.stock_In_Detail.create({
              data: {
                  Stock_In_stockInID: stockIn.stockInID,
                  Stock_stockID: item.stockID,
                  ingredientName: item.ingredientName,
                  quantity: parseFloat(item.quantity),
                  unit: item.unit,
                  pricePerUnit: parseFloat(item.pricePerUnit),
                  totalPrice: parseFloat(item.totalPrice),
              },
          });

          // อัพเดทจำนวนสินค้าใน Stock
          await prisma.stock.update({
              where: { stockID: item.stockID },
              data: {
                  Quantity: {
                      increment: parseFloat(item.quantity),
                  },
                  costPrice: parseFloat(item.pricePerUnit),
                  LastUpdated: new Date(),
              },
          });
      }

      return stockIn;
  } catch (error) {
      console.error("Error creating stock in with details:", error);
      throw error;
  }
};


export const outStock = async (formdata: FormData) => {
  try {
    const empID = formdata.get("empID");
    const stockID = formdata.get("stockID");
    const quantity = formdata.get("quantity");
    const unit = formdata.get("unit");

    if (!empID) {
      throw new Error("รับชื่อพนักงานไม่ได้");
    }
    if (!stockID) {
      throw new Error("รับ StockID ไม่ได้");
    }
    if (!quantity || parseFloat(quantity as string) <= 0) {
      throw new Error("รับจำนวนไม่ได้");
    }
    if (!unit) {
      throw new Error("รับหน่วยไม่ได้");
    }

    const Employee_empID = parseInt(empID as string);
    const Stock_stockID = parseInt(stockID as string);
    const Quantity = parseFloat(quantity as string);
    const Unit = unit as string;
    const tsCreatedAt = new Date();
    const note = formdata.get("note") as string;

    // สร้างข้อมูลการเบิกของใน TimeScription
    const stock_out = await prisma.timeScription.create({
      data: {
        Employee_empID,
        Stock_stockID,
        tsCreatedAt,
        Unit,
        Quantity,
        note,
      },
    });

    // เช็คจำนวนของในสต็อกก่อนที่จะเบิก
    const currentStock = await prisma.stock.findUnique({
      where: { stockID: Stock_stockID }
    });

    if (!currentStock || currentStock.Quantity < Quantity) {
      throw new Error("จำนวนในสต็อกไม่พอสำหรับการเบิก");
    }

    // หักจำนวนจาก stock หลัก
    const updatedStock = await prisma.stock.update({
      where: { stockID: Stock_stockID },
      data: {
        Quantity: {
          decrement: Quantity,
        },
        LastUpdated: new Date(),
      },
    });

    return { stock_out, updatedStock };
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
};



//fetch ข้อมูลจากฐานข้อมูล
export const fetchStock = async () => {
  try {
    const stocks = await prisma.stock.findMany({
      where: {
          isDeleted: false // แสดงเฉพาะรายการที่ยังไม่ถูกลบ
      },

  });
  return stocks;
} catch (error) {
  console.error('Fetch stock error:', error);
  throw error;
}
};


export const fetchStockIn = async () => {
  try {
    const stock_In = await prisma.stock_In.findMany({
      include: {
        employee: true // คำสั่ง join กับตาราง employee
      }
    });
    return stock_In
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
};

//ดึงข้อมูลพนักงาน
export const fetchEmployee = async () => {
  try {
    const employee = await prisma.employee.findMany();
    return employee;
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
}

export const fetchTimeScription = async () => {
  try {
    const stock_out = await prisma.timeScription.findMany({
      include: {
        stock: true, // คำสั่ง join กับตาราง employee
        employee: true // คำสั่ง join กับตาราง employee
      }
    });
    return stock_out
  } catch (error) {
    console.error("Error fetching stock:", error);
    return [];
  }
};


export const fetchStockInDetails = async (stockInID: number) => {
  try {
      // ดึงข้อมูลจาก Stock_In และ Stock_In_Detail พร้อมกัน
      const stockInData = await prisma.stock_In.findUnique({
          where: { 
              stockInID 
          },
          include: {
              employee: true,
              stockInDetail: {
                include: {
                    stock: true // เพิ่ม relation กับตาราง Stock
                }
            }
          }
      });

      if (!stockInData) {
          throw new Error("ไม่พบข้อมูลการนำเข้า");
      }

      // จัดรูปแบบข้อมูลที่จะส่งกลับ
      return {
          stockIn: {
              stockInID: stockInData.stockInID,
              stockInDateTime: stockInData.stockInDateTime,
              totalPrice: stockInData.totalPrice,
              employee: stockInData.employee,
              note: stockInData.note
          },
          details: stockInData.stockInDetail.map(detail => ({
              stockInDetailID: detail.stockInDetailID,
              ingredientName: detail.ingredientName,
              quantity: detail.quantity,
              unit: detail.unit,
              pricePerUnit: detail.pricePerUnit,
              totalPrice: detail.totalPrice,
              stock: detail.stock
          }))
      };
  } catch (error) {
      console.error("Error fetching stock in details:", error);
      throw error;
  }
};


// ฟังก์ชันสำหรับแก้ไข stock
export async function updateStock(stockID: number, data: {
  ingredientName?: string;
  costPrice?: number;
  Unit?: string;
  minQuantity?: number;
  Quantity?: number;
}) {
  try {
    // ตรวจสอบข้อมูลก่อนอัพเดท
      if (data.Quantity !== undefined && data.Quantity < 0) {
        throw new Error("จำนวนคงเหลือต้องไม่น้อยกว่า 0");
      }
      const updated = await prisma.stock.update({
          where: { stockID },
          data: {
              ...data,
              LastUpdated: new Date()
          }
      });
      return updated;
  } catch (error) {
      console.error('Update stock error:', error);
      throw error;
  }
}

// เพิ่มฟังก์ชันสำหรับ Soft Delete
export const deleteStock = async (stockID: number) => {
  try {
      // ตรวจสอบว่ามีการใช้งานใน Stock_In_Detail หรือ StockOutDetail หรือไม่
      const stockInUse = await prisma.stock_In_Detail.findFirst({
          where: { Stock_stockID: stockID }
      });

      const stockOutUse = await prisma.stockOutDetail.findFirst({
          where: { stockID }
      });

      if (stockInUse || stockOutUse) {
          throw new Error("ไม่สามารถลบได้เนื่องจากมีการใช้งานในประวัติการนำเข้าหรือเบิกออก");
      }

      // ทำ Soft Delete
      const updatedStock = await prisma.stock.update({
          where: { stockID },
          data: {
              isDeleted: true,
              deletedAt: new Date(),
              LastUpdated: new Date()
          }
      });

      return { success: true, data: updatedStock };
  } catch (error) {
      console.error('Delete stock error:', error);
      throw error;
  }
};

