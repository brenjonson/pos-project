import StockInAdd from "@/components/stockin/StockInAdd";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function StockIn() {
  return (
   <div className="p-6 max-w-2xl mx-auto">
         <Card>
           <CardHeader>
             <CardTitle className="text-2xl font-semibold">ประวัตินำเข้าสินค้า</CardTitle>
           </CardHeader>
           <CardContent>
             <StockInAdd/>
           </CardContent>
         </Card>
       </div>
  )
}