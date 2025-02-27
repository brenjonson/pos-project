import React from 'react';
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { th } from "date-fns/locale";
import { Edit, Trash2, AlertTriangle, CheckCircle, Image as ImageIcon } from "lucide-react";
import { useState } from 'react';
import { StockCardProps } from '@/utils/types';
import { toast } from 'sonner';
import { Upload } from 'lucide-react';
import { EditStockDialog } from './EditStockDialog';
import { useRouter } from 'next/navigation';
import { updateStock } from '@/actions/actions';
import { deleteStock } from '@/actions/actions';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';

export default function StockCard({ stock, onEdit, onDelete }: StockCardProps) {
    const router = useRouter();
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

    const [isUploading, setIsUploading] = useState(false);

    // กำหนดค่าจำนวนขั้นต่ำ (ถ้าไม่มีให้ใช้ค่า default เป็น 20)
    const minQuantity = stock.minQuantity ?? 20;

    // ตรวจสอบสถานะของสินค้า
    const isLowStock = stock.Quantity <= minQuantity;

    // คำนวณเปอร์เซ็นต์ของสินค้าคงเหลือเทียบกับขั้นต่ำ 
    const stockPercentage = Math.min(100, Math.round((stock.Quantity / minQuantity) * 100));


    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            const formData = new FormData();
            formData.append('file', file);
            formData.append('stockId', stock.stockID.toString());

            const response = await fetch('/api/uploadphoto', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                // อัพเดทรูปภาพในหน้าเว็บทันที
                onEdit && onEdit(stock.stockID);
                toast.error("อัพโหลดรูปภาพสำเร็จ กดรีเฟรซ");
            } else {
                toast.error("ไม่สามารถอัพโหลดรูปภาพได้");
            }
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการอัพโหลด");
        } finally {
            setIsUploading(false);
        }
    };

    // ฟังก์ชันสำหรับการแก้ไข
    const handleEdit = async (formData: FormData) => {
        try {
            setIsLoading(true);
            const data = {
                ingredientName: formData.get('ingredientName') as string,
                costPrice: parseFloat(formData.get('costPrice') as string),
                Unit: formData.get('unit') as string,
                minQuantity: parseFloat(formData.get('minQuantity') as string),
            };
            
            await updateStock(stock.stockID, data);
            toast.success("แก้ไขข้อมูลสำเร็จ");
            router.refresh();
            setIsEditDialogOpen(false);
        } catch (error) {
            toast.error("เกิดข้อผิดพลาดในการแก้ไขข้อมูล");
        } finally {
            setIsLoading(false);
        }
    };

        // ฟังก์ชันสำหรับการลบข้อมูล
        const handleDeleteClick = () => {
            setIsDeleteDialogOpen(true);
        };
    
        const handleDeleteConfirm = async () => {
            try {
                setIsLoading(true);
                await deleteStock(stock.stockID);
                toast.success("ลบข้อมูลสำเร็จ");
                router.refresh();
                setIsDeleteDialogOpen(false);
            } catch (error) {
                if (error instanceof Error) {
                    toast.error(error.message || "เกิดข้อผิดพลาดในการลบข้อมูล");
                } else {
                    toast.error("เกิดข้อผิดพลาดในการลบข้อมูล");
                }
            } finally {
                setIsLoading(false);
            }
        };

    const handleDelete = async () => {
        try {
            setIsLoading(true);
            await deleteStock(stock.stockID);
            toast.success("ลบข้อมูลสำเร็จ");
            router.refresh();
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error.message || "เกิดข้อผิดพลาดในการลบข้อมูล");
            } else {
                toast.error("เกิดข้อผิดพลาดในการลบข้อมูล");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full bg-white shadow-sm rounded-lg overflow-hidden border border-gray-100">
            <div className="flex p-4 border-b border-gray-100">
                {/* ส่วนของรูปภาพวัตถุดิบ */}
                <div className="relative mr-4">
                    {stock.imageUrl ? (
                        <div className="w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                            <img
                                src={stock.imageUrl}
                                alt={stock.ingredientName}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/placeholder.png";
                                }}
                            />
                        </div>
                    ) : (
                        <div className="w-16 h-16 rounded-md bg-gray-100 flex items-center justify-center">
                            <ImageIcon className="h-8 w-8 text-gray-400" />
                        </div>
                    )}

                    {/* ปุ่มอัพโหลดรูปภาพ */}
                    <label className="absolute -bottom-2 -right-2 p-1 bg-white rounded-full shadow-md cursor-pointer hover:bg-gray-50">
                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading}
                        />
                        <Upload className="h-4 w-4 text-gray-600" />
                    </label>
                </div>

                {/* ส่วนของข้อมูลหลัก */}
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800">{stock.ingredientName}</h3>
                    <div className="flex items-center mt-2">
                        <span className="text-sm text-gray-500">รหัส: {stock.stockID}</span>
                        <span className="mx-2 text-gray-300">•</span>
                        <span className="text-sm text-gray-500">ราคาต้นทุน: ฿{stock.costPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            <div className="p-4">
                <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                        <div className="mr-3">
                            {isLowStock ? (
                                <AlertTriangle className="h-5 w-5 text-red-500" />
                            ) : (
                                <CheckCircle className="h-5 w-5 text-emerald-500" />
                            )}
                        </div>
                        <div>
                            <div className="text-sm font-medium text-gray-700">สถานะคงคลัง</div>
                            <div className={`text-sm ${isLowStock ? 'text-red-600 font-medium' : 'text-emerald-600'}`}>
                                {isLowStock ? 'ต่ำกว่าขั้นต่ำ' : 'ปกติ'}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="text-sm font-medium text-gray-700">อัปเดตล่าสุด</div>
                        <div className="text-sm text-gray-600">
                            {format(new Date(stock.LastUpdated), 'd MMM yyyy HH:mm', { locale: th })}
                        </div>
                    </div>
                </div>

                {/* แก้ไขให้หลอดเป็นสีแดงเมื่อสินค้าต่ำกว่าขั้นต่ำ */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700">
                            จำนวนคงเหลือ: {stock.Quantity} {stock.Unit}
                        </span>
                        <span className="text-sm text-gray-500">
                            ขั้นต่ำ: {minQuantity} {stock.Unit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className={`h-2 rounded-full ${isLowStock ? 'bg-red-500' : 'bg-emerald-500'}`}
                            style={{ width: `${stockPercentage}%` }}
                        ></div>
                    </div>
                </div>

                <div className="flex justify-end space-x-2 mt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center text-blue-600 border-blue-200 hover:bg-blue-50"
                        onClick={() => setIsEditDialogOpen(true)}
                    >
                        <Edit className="h-4 w-4 mr-1" />
                        แก้ไข
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center text-red-600 border-red-200 hover:bg-red-50"
                        onClick={handleDeleteClick}
                        disabled={isLoading}
                    >
                        <Trash2 className="h-4 w-4 mr-1" />
                        ลบ
                    </Button>
                </div>

                <EditStockDialog
                    stock={stock}
                    isOpen={isEditDialogOpen}
                    isLoading={isLoading}
                    onOpenChange={setIsEditDialogOpen}
                    onSubmit={handleEdit}
                />

                <DeleteConfirmDialog
                    isOpen={isDeleteDialogOpen}
                    isLoading={isLoading}
                    stockName={stock.ingredientName}
                    onOpenChange={setIsDeleteDialogOpen}
                    onConfirm={handleDeleteConfirm}
                />
            </div>
        </div>
    );
}