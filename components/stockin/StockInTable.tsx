import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, User } from 'lucide-react';
import { formatDateTime, formatPrice } from '@/lib/utils';
import EmployeeCell from './EmployeeCell';
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"
import Link from "next/link"
import { Ban } from "lucide-react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cancelStockIn } from '@/actions/actions';
import ComboBoxCus from '../combobox/ComboBoxCus';

interface ComboBoxCusProps {
  onSelect: (value: string) => void;
}

export default function StockInTable({ data }) {
    console.log('Data received in table:', data); // เพิ่ม log ตรงนี้
    const router = useRouter();
    const [selectedStockIn, setSelectedStockIn] = useState(null);
    const [cancelNote, setCancelNote] = useState('');
    const [cancelEmpID, setCancelEmpID] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirmCancel = async () => {
        if (!selectedStockIn || !cancelNote || !cancelEmpID) return;

        try {
            setIsLoading(true);
            await cancelStockIn(
                selectedStockIn.stockInID, 
                parseInt(cancelEmpID), // แปลงเป็นตัวเลข
                cancelNote
            );

            toast.success('ยกเลิกรายการนำเข้าสำเร็จ');
            router.refresh();

            // รีเซ็ต state
            setSelectedStockIn(null);
            setCancelNote('');
            setCancelEmpID('');
        } catch (error) {
            toast.error((error as Error).message || 'เกิดข้อผิดพลาดในการยกเลิกรายการ');
        } finally {
            setIsLoading(false);
        }
    };


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
                        <TableHead className="text-center">ดูรายละเอียด</TableHead>
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
                            <TableCell className="text-center">
                                <div className="flex items-center justify-center gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        asChild
                                    >
                                        <Link href={`/stockin/${item.stockInID}`}>
                                            <Eye className="w-4 h-4 mr-1" />
                                            ดูรายละเอียด
                                        </Link>
                                    </Button>
                                    {!item.isCanceled && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                            onClick={() => setSelectedStockIn(item)}
                                        >
                                            <Ban className="w-4 h-4 mr-1" />
                                            ยกเลิก
                                        </Button>
                                    )}
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            
            <Dialog open={!!selectedStockIn} onOpenChange={(open) => !open && setSelectedStockIn(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>ยืนยันการยกเลิกรายการนำเข้า</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                        <p>คุณต้องการยกเลิกรายการนำเข้ารหัส {selectedStockIn?.stockInID} ใช่หรือไม่?</p>
                        <div className="space-y-2">
                            <Label>หมายเหตุการยกเลิก</Label>
                            <Input
                                value={cancelNote}
                                onChange={(e) => setCancelNote(e.target.value)}
                                placeholder="ระบุเหตุผลการยกเลิก"
                                required
                            />
                            <ComboBoxCus/>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setSelectedStockIn(null);
                                setCancelNote('');
                            }}
                            disabled={isLoading}
                        >
                            ยกเลิก
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={handleConfirmCancel}
                            disabled={!cancelNote || isLoading}
                        >
                            {isLoading ? "กำลังดำเนินการ..." : "ยืนยันการยกเลิก"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}