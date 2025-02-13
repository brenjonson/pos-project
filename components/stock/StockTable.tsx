// components/stock/StockTable.tsx
import React from 'react';
import prisma from '@/utils/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";


interface StockItem {
  id: number;
  name: string;
  quantity: number;
  unit: string;
  minQuantity: number;
}

interface StockTableProps {
  items: StockItem[];
  onEdit: (item: StockItem) => void;
  onDelete: (item: StockItem) => void;
}

export const StockTable: React.FC<StockTableProps> = ({ items, onEdit, onDelete }) => {
  

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>รหัสสินค้า</TableHead>
          <TableHead>ชื่อสินค้า</TableHead>
          <TableHead className="text-right">จำนวนคงเหลือ</TableHead>
          <TableHead>หน่วย</TableHead>
          <TableHead className="text-right">จำนวนขั้นต่ำ</TableHead>
          <TableHead>สถานะ</TableHead>
          <TableHead className="text-right">การจัดการ</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell>{item.unit}</TableCell>
            <TableCell className="text-right">{item.minQuantity}</TableCell>
            <TableCell>
              <div className={`px-2 py-1 rounded-full text-center text-sm 
                ${item.quantity <= item.minQuantity 
                  ? 'bg-red-100 text-red-800' 
                  : 'bg-green-100 text-green-800'
                }`}>
                {item.quantity <= item.minQuantity ? 'ต่ำกว่าขั้นต่ำ' : 'ปกติ'}
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Button 
                variant="outline" 
                size="sm" 
                className="mr-2"
                onClick={() => onEdit(item)}
              >
                แก้ไข
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => onDelete(item)}
              >
                ลบ
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};