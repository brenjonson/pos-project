'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { addStock } from "@/actions/actions";
import { useState } from "react";

import { ComboboxDemo } from "../combobox/ComboBoxIngredien";

export default function NewIngredian() {
    const [selectedUnit, setSelectedUnit] = useState('');

    // ใช้ onValueChange แทน onChange
    const handleSelectChange = (value: string) => {
        setSelectedUnit(value); // กำหนดค่าที่เลือกใน state
    };



    return (
        <div>
            <form className="space-y-6" action={addStock}>


                {/* ชื่อสินค้า */}
                <div className="space-y-2">
                    <Label htmlFor="name">ชื่อสินค้า</Label>
                    <Input id="name" placeholder="กรอกชื่อสินค้า" name="ingredientName" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    {/* จำนวน */}
                    <div className="space-y-2">
                        <Label htmlFor="quantity">จำนวน</Label>
                        <Input id="quantity" type="number" placeholder="0" name="quantity" />
                    </div>

                    {/* หน่วย */}
                    <div className="space-y-2">
                        <Label htmlFor="unit">หน่วย</Label>
                        <Select name="unit" onValueChange={handleSelectChange}>
                            <SelectTrigger id="unit">
                                <SelectValue placeholder="เลือกหน่วย" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kg">กิโลกรัม (กก.)</SelectItem>
                                <SelectItem value="g">กรัม (ก.)</SelectItem>
                                <SelectItem value="piece">ชิ้น</SelectItem>
                                <SelectItem value="pack">แพ็ค</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>


                <div className="grid grid-cols-2 gap-4">
                    {/* ราคาต่อหน่วย */}
                    <div className="space-y-2">
                        <Label htmlFor="price">ราคาต่อหน่วย (บาท)</Label>
                        <Input
                            id="price"
                            name="price"
                            type="number"
                            placeholder="0.00"
                            step="0.01"
                        />
                    </div>

                    {/* หมวดหมู่สินค้า */}
                    <div className="space-y-2">
                        <Label htmlFor="category">หมวดหมู่</Label>
                        <Select>
                            <SelectTrigger id="category">
                                <SelectValue placeholder="เลือกหมวดหมู่" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="kg">เนื้อสัตว์ (กก.)</SelectItem>
                                <SelectItem value="g">ผัก (ก.)</SelectItem>
                                <SelectItem value="piece">เส้น</SelectItem>
                                <SelectItem value="pack">เครื่องดื่ม</SelectItem>
                                <SelectItem value="beverage">ของทานเล่น</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
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