﻿import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import StockOutStat from './StockOutStat';
import StockOutTable from './StockOutTable';

export default function StockOutCard({ stockOuts }) {
    if (!stockOuts || stockOuts.length === 0) {
        return (
          <Card className="w-full shadow-lg">
            <CardContent className="p-6 text-center text-gray-500">
              กำลังโหลดข้อมูล...
            </CardContent>
          </Card>
        );
      }
  
    return (
          <Card className="w-full shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl font-bold text-blue-900">ประวัติการเบิกสินค้า</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full shadow-sm">
                    <Calendar className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-600">ข้อมูลล่าสุด</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="p-6">
             <StockOutStat data={stockOuts} />
             <StockOutTable data={stockOuts} />
            </CardContent>
          </Card>
  )
}