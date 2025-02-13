import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, User } from 'lucide-react';
import { formatDateTime, formatPrice } from '@/lib/utils';
import EmployeeCell from '../stockin/EmployeeCell';
import { List } from 'lucide-react';
import { ShoppingBasket } from 'lucide-react';

export default function StockOutTable({ data }) {
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
                        <TableHead className="text-center">รหัสนำออก</TableHead>
                        <TableHead>วันที่และเวลา</TableHead>
                        <TableHead>จำนวนรายการ</TableHead>
                        <TableHead>หน่วย</TableHead>
                        <TableHead>พนักงาน</TableHead>
                        <TableHead>หมายเหตุ</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody key={data.stockOutID}>
                    {data.map((item) => (
                        <TableRow key={item.stockOutID} className="hover:bg-gray-50">
                            {/* รหัสนำออก */}
                            <TableCell className="text-center font-medium"> 
                                {String(item.stockOutID).padStart(4, '0')}
                            </TableCell>
                            {/* วันที่และเวลา */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-gray-400" />
                                    {item.tsCreatedAt ? formatDateTime(item.tsCreatedAt) : 'Invalid Date'}
                                </div>
                            </TableCell>
                            {/* จำนวนรายการ */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <List className="w-4 h-4 text-gray-400" />
                                    {item.Quantity ? item.Quantity : 'Invalid Quantity'}
                                    <p>รายการ</p>
                                </div>
                            </TableCell>
                            {/* หน่วย */}
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <ShoppingBasket className="w-4 h-4 text-gray-400" />
                                    {item.Unit ? item.Unit : 'Invalid Unit'}
                                </div>
                            </TableCell>
                            {/* พนักงาน */}
                            <TableCell>
                                <EmployeeCell
                                    id={item.Employee_empID}
                                    fname={item.employee.empFname}
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
    )
}