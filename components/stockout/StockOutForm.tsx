'use client'
import { Button } from '@/components/ui/button';
import { useState } from "react";
import { outStock } from "@/actions/actions";
import { UnitSelect } from './UnitSelect';
import ComboBoxCus from '../combobox/ComboBoxCus';
import { ComboboxStockID } from '../combobox/ComboBoxStockID';
import { Package2, UserCircle, ClipboardList, Scale, Box, StickyNote } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';


export default function StockOutForm() {
    const [selectedUnit, setSelectedUnit] = useState('');
    
      const handleSelectChange = (value) => {
        setSelectedUnit(value);
      };
    
      const handleSubmit = async (formData) => {
        await outStock(formData);
      };


    return (
        <div>
            <form className="space-y-6" action={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* รหัสพนักงาน */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <UserCircle className="w-4 h-4 text-indigo-600" />
                            รหัสพนักงาน
                        </label>
                        <ComboBoxCus />
                    </div>

                    {/* รหัสสินค้า */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Package2 className="w-4 h-4 text-indigo-600" />
                            สินค้า
                        </label>
                        <ComboboxStockID />
                    </div>

                    {/* หน่วย */}
                    <div className="space-y-2">
                        <UnitSelect onValueChange={handleSelectChange} />
                    </div>

                    {/* จำนวน */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                            <Box className="w-4 h-4 text-indigo-600" />
                            จำนวน
                        </label>
                        <Input
                            type="number"
                            name="quantity"
                            placeholder="ระบุจำนวน"
                            className="transition-all duration-200 hover:border-indigo-400"
                        />
                    </div>
                </div>


                {/* หมายเหตุ */}
                <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <StickyNote className="w-4 h-4 text-indigo-600" />
                        หมายเหตุ
                    </label>
                    <Textarea
                        name="note"
                        rows={4}
                        placeholder="เพิ่มหมายเหตุ (ถ้ามี)"
                        className="transition-all duration-200 hover:border-indigo-400"
                    />
                </div>

                <Button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2"
                >
                    <ClipboardList className="w-5 h-5" />
                    บันทึกข้อมูล
                </Button>
            </form>
        </div>
    )
}



