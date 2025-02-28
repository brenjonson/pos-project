import { useState, useCallback, useEffect } from 'react';
import { DateRange } from 'react-day-picker';
import { startOfDay, endOfDay, isWithinInterval, parseISO } from 'date-fns';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DateRangePicker } from './DateRangePicker';
import StockInStats from './StockInStats';
import StockInTable from './StockInTable';

export default function StockInCard({ stockIns }) {
  const [filteredStockIns, setFilteredStockIns] = useState(stockIns);

  // ใช้ useCallback เพื่อป้องกัน function ถูกสร้างใหม่ทุกครั้ง
  const handleDateRangeChange = useCallback((range: DateRange | undefined) => {
    if (!range || !range.from) {
      setFilteredStockIns(stockIns);
      return;
    }

    const filtered = stockIns.filter((stockIn) => {
      const stockInDate = parseISO(stockIn.stockInDateTime);
      
      if (range.to) {
        return isWithinInterval(stockInDate, {
          start: startOfDay(range.from!),
          end: endOfDay(range.to!)
        });
      }
      return isWithinInterval(stockInDate, {
        start: startOfDay(range.from!),
        end: endOfDay(range.from!)
      });
    });

    setFilteredStockIns(filtered);
  }, [stockIns]); // เพิ่ม dependency

  // อัพเดท filteredStockIns เมื่อ stockIns เปลี่ยน
  useEffect(() => {
    setFilteredStockIns(stockIns);
  }, [stockIns]);

  if (!stockIns || stockIns.length === 0) {
    return (
      <Card className="w-full shadow-lg">
        <CardContent className="p-6 text-center text-gray-500">
          ไม่พบข้อมูลการนำเข้าสินค้า
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold text-blue-900">
            ประวัติการนำเข้าสินค้า
          </CardTitle>
          <DateRangePicker onDateRangeChange={handleDateRangeChange} />
        </div>
      </CardHeader>
      <CardContent className="p-6">
        {filteredStockIns.length > 0 ? (
          <>
            <StockInStats data={filteredStockIns} />
            <StockInTable data={filteredStockIns} />
          </>
        ) : (
          <div className="text-center text-gray-500">
            ไม่พบข้อมูลการนำเข้าสินค้าในช่วงวันที่ที่เลือก
          </div>
        )}
      </CardContent>
    </Card>
  );
}