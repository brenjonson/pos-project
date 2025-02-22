import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface StockCardProps {
    stock: {
        stockID: number;
        ingredientName: string;
        Quantity: number;
        Unit: string;
        costPrice: number;
        LastUpdated: any;
    };
}

export default function StockCard({ stock }: StockCardProps) {
    return (
        <div className='w-full'>
            <div className='rounded-md border'>
                <Table>
                    <TableHeader>
                        <TableRow className="bg-slate-50">
                            <TableHead className="font-semibold">รหัสสินค้า</TableHead>
                            <TableHead className="font-semibold">ชื่อสินค้า</TableHead>
                            <TableHead className="text-right font-semibold">จำนวนคงเหลือ</TableHead>
                            <TableHead className="font-semibold">หน่วย</TableHead>
                            <TableHead className="text-right font-semibold">จำนวนขั้นต่ำ</TableHead>
                            <TableHead className="font-semibold">สถานะ</TableHead>
                            <TableHead className="text-right font-semibold">อัปเดตล่าสุด</TableHead>
                            <TableHead className="text-right font-semibold">การจัดการ</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow key={stock.stockID} className="hover:bg-slate-50">
                            <TableCell className="font-medium">{stock.stockID}</TableCell>
                            <TableCell>{stock.ingredientName}</TableCell>
                            <TableCell className="text-right">{stock.Quantity}</TableCell>
                            <TableCell>{stock.Unit}</TableCell>
                            <TableCell className="text-right">{stock.Quantity}</TableCell>
                            <TableCell>
                                <div className={`px-2 py-1 rounded-full text-center text-sm 
                        ${stock.Quantity <= 20
                                        ? 'bg-red-100 text-red-800'
                                        : 'bg-green-100 text-green-800'
                                    }`}>
                                    {stock.Quantity <= 20 ? 'ต่ำกว่าขั้นต่ำ' : 'ปกติ'}
                                </div>
                            </TableCell>
                            <TableCell className="text-right">{stock.LastUpdated}</TableCell>
                            <TableCell className="text-right">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="mr-2"
                                >
                                    แก้ไข
                                </Button>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                >
                                    ลบ
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
