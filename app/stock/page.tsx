import { Card, CardContent } from "@/components/ui/card";
import { StockHeader } from '@/components/stock/StockHeader';
import { StockSearch } from '@/components/stock/StockSearch';
import StockFetch from '@/components/stock/StockFetch';
import { Suspense } from 'react';

export default async function Stock({ searchParams}: { searchParams: { stock?: string }}) {
  // ดึงค่า search โดยตรงจาก searchParams โดยไม่ต้องใช้ await
  const { stock } = await searchParams;
  console.log(stock); // จะแสดงค่า search หจาก URL รือ undefined ถ้าไม่มี
  
  return (
    <div>
      <div className="p-6 max-w-6xl mx-auto">
        <Card>
          <StockHeader />
          <CardContent>
            <StockSearch />
            <Suspense fallback={<div>กำลังโหลด...</div>}>
              <StockFetch stock={stock} />
            </Suspense>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}