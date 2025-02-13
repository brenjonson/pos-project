'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { addStockIn } from "@/actions/actions";
import prisma from "@/utils/db";
import { title } from "process";
import { useState } from "react";

export default function StockInAdd() {
    const [selectedUnit, setSelectedUnit] = useState('');

    // ใช้ onValueChange แทน onChange
    const handleSelectChange = (value: string) => {
        setSelectedUnit(value); // กำหนดค่าที่เลือกใน state
    };



    return (
        <div>
            <form className="space-y-6" action={addStockIn}>


                {/* วันที่นำเข้า */}
                <div className="space-y-2">
                    <Label htmlFor="Datetime">วันที่และเวลานำเข้า</Label>
                    <Input id="Datetime" placeholder="วันที่และเวลานำเข้า" name="stockinDatetime" type="date"/>
                </div>

                {/* ราคาทั้งหมด */}
                <div className="space-y-2">
                    <Label htmlFor="totalPrice">ราคาทั้งหมด (บาท)</Label>
                    <Input
                        id="price"
                        name="totalPrice"
                        type="number"
                        placeholder="0.00"
                        step="0.01"
                    />
                </div>

                {/* พนักงานนำเข้า */}
                <div className="space-y-2">
                    <Label htmlFor="empID">พนักงานที่นำเข้า</Label>
                    <Input id="empID" placeholder="รหัสพนักงาน" name="empID" type="number"/>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="note">หมายเหตุ (ถ้ามี)</Label>
                    <Input id="note" placeholder="เพิ่มหมายเหตุ" name="note"/>
                </div>


                <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                        บันทึก
                    </Button>
                    <Button type="button" variant="outline" className="flex-1">
                        <Link href={'/stock'}>ยกเลิก</Link>
                    </Button>
                </div>
            </form>
        </div>
    )
}