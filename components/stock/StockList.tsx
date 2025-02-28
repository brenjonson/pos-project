import { StockListProps } from "@/utils/types";
import StockCard from "./StockCard";

export default function StockList({ stocks }: StockListProps) {
  // เพิ่มการตรวจสอบ stocks
  if (!stocks || !Array.isArray(stocks) || stocks.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p className="text-lg">ไม่พบรายการสินค้า</p>
        <p className="text-sm">ลองค้นหาด้วยคำค้นอื่น หรือดูรายการสินค้าทั้งหมด</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {stocks.map((stock) => (
        <StockCard 
          key={stock.stockID}
          stock={stock}
        />
      ))}
    </div>
  );
}