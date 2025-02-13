import StockAdd from "@/components/stock/StockAdd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";


export default function AddStock() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">เพิ่มสินค้าใหม่</CardTitle>
        </CardHeader>
        <CardContent>
          <StockAdd/>
        </CardContent>
      </Card>
    </div>
  );
}