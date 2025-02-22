import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StockInDetailAdd from "@/components/stockindeatil/StockInDetailAdd";
import ListDetail from "@/components/stockindeatil/ListDetail";

export default function StockInDetailPage() {
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">รายละเอียดการรับสินค้า</CardTitle>
        </CardHeader>
        <CardContent>
          <StockInDetailAdd />
        </CardContent>
      </Card>
    </div>
  )
}