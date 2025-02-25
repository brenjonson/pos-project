import { fetchStockInDetails } from "@/actions/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { format } from "date-fns"
import { th } from "date-fns/locale"

export default async function StockInDetailPage({ params }: { params: { id: string } }) {
    const data = await fetchStockInDetails(parseInt(params.id))

    return (
        <Card className="max-w-4xl mx-auto">
            <CardHeader>
                <CardTitle>รายละเอียดการนำเข้าสินค้า #{params.id}</CardTitle>
                <div className="text-sm text-gray-500">
                    <div>วันที่: {format(new Date(data.stockIn.stockInDateTime), 'PP', { locale: th })}</div>
                    <div>พนักงาน: {data.stockIn.employee.empFname} {data.stockIn.employee.empLname}</div>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>ชื่อวัตถุดิบ</TableHead>
                            <TableHead className="text-right">จำนวน</TableHead>
                            <TableHead>หน่วย</TableHead>
                            <TableHead className="text-right">ราคาต่อหน่วย</TableHead>
                            <TableHead className="text-right">ราคารวม</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data.details.map((item) => (
                            <TableRow key={item.stockInDetailID}>
                                <TableCell>{item.ingredientName}</TableCell>
                                <TableCell className="text-right">{item.quantity}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell className="text-right">
                                    {item.pricePerUnit.toLocaleString('th-TH', {
                                        style: 'currency',
                                        currency: 'THB'
                                    })}
                                </TableCell>
                                <TableCell className="text-right">
                                    {item.totalPrice.toLocaleString('th-TH', {
                                        style: 'currency',
                                        currency: 'THB'
                                    })}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow className="font-bold">
                            <TableCell colSpan={4} className="text-right">รวมทั้งหมด</TableCell>
                            <TableCell className="text-right">
                                {data.stockIn.totalPrice.toLocaleString('th-TH', {
                                    style: 'currency',
                                    currency: 'THB'
                                })}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}