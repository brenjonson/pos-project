// components/stock/StockHeader.tsx
import React from 'react';
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, RefreshCw } from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StockHeaderProps {
  onAddNew: () => void;
  onRefresh: () => void;
}

export const StockHeader: React.FC<StockHeaderProps> = () => {
  const router = useRouter();

  const handleRefresh = () => {
    router.refresh();
    router.push('/stock');
  };

  return (
    <CardHeader>
      <div className="flex justify-between items-center">
        <CardTitle className="text-2xl font-bold">ระบบจัดการสต็อกสินค้า</CardTitle>
        <div className="flex gap-2">
          <Button  className="flex items-center gap-2">
            <PlusCircle className="w-4 h-4" />
              <Link href={'/addstock/addstockNew'}>เพิ่มสินค้าใหม่</Link>
          </Button>
          <Button 
            variant="outline" 
            className="flex items-center gap-2"
            onClick={handleRefresh}
          >
            <RefreshCw className="w-4 h-4" />
            รีเฟรช
          </Button>
        </div>
      </div>
    </CardHeader>
  );
};