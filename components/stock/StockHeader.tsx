// components/stock/StockHeader.tsx
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import Link from 'next/link';
Link

interface StockHeaderProps {
  onAddNew: () => void;
  onRefresh: () => void;
}

export const StockHeader: React.FC<StockHeaderProps> = () => {
  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">ระบบจัดการสต็อกสินค้า</CardTitle>
        <div className="flex gap-2">
          <Button  className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
              <Link href={'/addstock'}>เพิ่มสินค้าใหม่</Link>
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            รีเฟรช
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};