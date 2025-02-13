import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, User } from 'lucide-react';
import { formatDateTime, formatPrice } from '@/lib/utils';
import EmployeeCell from './EmployeeCell';


export default function StockInTable({ data }) {
    console.log('Data received in table:', data); // เพิ่ม log ตรงนี้

    // ตรวจสอบว่ามีข้อมูลหรือไม่
    if (!data || data.length === 0) {
        return (
            <div className="text-center p-4 text-gray-500">
                ไม่พบข้อมูลการนำเข้าสินค้า
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="text-center">รหัสนำเข้า</TableHead>
                        <TableHead>วันที่และเวลา</TableHead>
                        <TableHead className="text-right">มูลค่ารวม</TableHead>
                        <TableHead>พนักงาน</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((item) => (
                        <TableRow key={item.stockInID} className="hover:bg-gray-50">
                            <TableCell className="text-center font-medium">
                                {String(item.stockInID).padStart(4, '0')}
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {formatDateTime(item.stockInDateTime)}
                                </div>
                            </TableCell>
                            <TableCell className="text-right font-medium text-green-700">
                                {formatPrice(item.totalPrice)}
                            </TableCell>
                            <TableCell>
                                
                                <EmployeeCell
                                    id={item.Employee_empID}
                                    fname={item.employee.empFname} // ใช้ optional chaining
                                    lname={item.employee.empLname}
                                />
                            </TableCell>
                            <TableCell className="text-gray-600">
                                {item.note || '-'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}