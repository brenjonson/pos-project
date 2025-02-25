'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { addStock } from "@/actions/actions";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, X, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ImagePlus } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';


export default function NewIngredian() {
    const router = useRouter();
    const [selectedUnit, setSelectedUnit] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [formError, setFormError] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    // ใช้ onValueChange แทน onChange
    const handleSelectChange = (value: string) => {
        setSelectedUnit(value);
    };

    const handleCategoryChange = (value: string) => {
        setSelectedCategory(value);
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            // ตรวจสอบความถูกต้องของฟอร์ม
            const ingredientName = formData.get('ingredientName') as string;
            if (!ingredientName) {
                setFormError('กรุณากรอกชื่อสินค้า');
                return;
            }
    
            // เพิ่ม URL รูปภาพลงในฟอร์ม (ถ้ามี)
            if (imageUrl) {
                formData.append('imageUrl', imageUrl);
            }
    
            // เรียกใช้ addStock เพียงครั้งเดียว
            await addStock(formData);
            
            toast.success('บันทึกข้อมูลสำเร็จ');
            router.push('/stock');
            router.refresh();
    
        } catch (error) {
            console.error('Submit error:', error);
            setFormError('เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองใหม่อีกครั้ง');
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        try {
            setIsUploading(true);
            setFormError(null);

            // สร้าง preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setImageUrl(data.imageUrl);
                toast.success("อัพโหลดรูปภาพสำเร็จ");
            } else {
                throw new Error(data.message);
            }
        } catch (error) {
            console.error('Upload error:', error);
            setFormError(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดในการอัพโหลด');
            setImagePreview(null);
            setImageUrl(null);
        } finally {
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        setImagePreview(null);
        setImageUrl(null);
    };


    return (
        <div className="max-w-4xl mx-auto p-4">
            <Card className="shadow-lg border rounded-lg overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b">
                    <CardTitle className="text-2xl font-bold text-slate-800">เพิ่มวัตถุดิบใหม่</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    {formError && (
                        <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{formError}</AlertDescription>
                        </Alert>
                    )}

                    <form action={handleSubmit} className="space-y-6">
                        {/* ชื่อสินค้า */}
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium flex items-center">
                                ชื่อสินค้า <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Input
                                id="name"
                                placeholder="กรอกชื่อสินค้า"
                                name="ingredientName"
                                className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* จำนวน */}
                            <div className="space-y-2">
                                <Label htmlFor="quantity" className="text-sm font-medium flex items-center">
                                    จำนวน <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Input
                                    id="quantity"
                                    type="number"
                                    placeholder="0"
                                    name="quantity"
                                    className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                            </div>

                            {/* หน่วย */}
                            <div className="space-y-2">
                                <Label htmlFor="unit" className="text-sm font-medium flex items-center">
                                    หน่วย <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Select name="unit" onValueChange={handleSelectChange} value={selectedUnit}>
                                    <SelectTrigger id="unit" className="focus:ring-2 focus:ring-blue-500 transition-shadow">
                                        <SelectValue placeholder="เลือกหน่วย" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="kg">กิโลกรัม (กก.)</SelectItem>
                                        <SelectItem value="g">กรัม (ก.)</SelectItem>
                                        <SelectItem value="piece">ชิ้น</SelectItem>
                                        <SelectItem value="pack">แพ็ค</SelectItem>
                                        <SelectItem value="bottle">ขวด</SelectItem>
                                        <SelectItem value="box">กล่อง</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* ราคาต่อหน่วย */}
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-sm font-medium flex items-center">
                                    ราคาต่อหน่วย (บาท) <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="price"
                                        name="price"
                                        type="number"
                                        placeholder="0.00"
                                        step="0.01"
                                        className="focus:ring-2 focus:ring-blue-500 transition-shadow pl-8"
                                    />
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
                                </div>
                            </div>

                            {/* จำนวนขั้นต่ำ */}
                            <div className="space-y-2">
                                <Label htmlFor="minQuantity" className="text-sm font-medium">จำนวนขั้นต่ำ</Label>
                                <Input
                                    id="minQuantity"
                                    name="minQuantity"
                                    type="number"
                                    placeholder="0"
                                    defaultValue="0"
                                    className="focus:ring-2 focus:ring-blue-500 transition-shadow"
                                />
                            </div>
                        </div>

                        {/* หมวดหมู่สินค้า */}
                        <div className="space-y-2">
                            <Label htmlFor="category" className="text-sm font-medium flex items-center">
                                หมวดหมู่ <span className="text-red-500 ml-1">*</span>
                            </Label>
                            <Select name="category" onValueChange={handleCategoryChange} value={selectedCategory}>
                                <SelectTrigger id="category" className="focus:ring-2 focus:ring-blue-500 transition-shadow">
                                    <SelectValue placeholder="เลือกหมวดหมู่" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="meat">เนื้อสัตว์</SelectItem>
                                    <SelectItem value="vegetable">ผัก</SelectItem>
                                    <SelectItem value="noodle">เส้น</SelectItem>
                                    <SelectItem value="beverage">เครื่องดื่ม</SelectItem>
                                    <SelectItem value="snack">ของทานเล่น</SelectItem>
                                    <SelectItem value="seasoning">เครื่องปรุง</SelectItem>
                                    <SelectItem value="other">อื่นๆ</SelectItem>
                                </SelectContent>
                            </Select>
                            {/* เพิ่มส่วนอัพโหลดรูป */}
                            <div className="space-y-2">
                                <Label className="text-sm font-medium">รูปภาพวัตถุดิบ</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <input
                                        type="file"
                                        id="image-upload"
                                        className="hidden"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        disabled={isUploading}
                                    />

                                    {!imagePreview ? (
                                        <label
                                            htmlFor="image-upload"
                                            className="cursor-pointer block"
                                        >
                                            <div className="space-y-4">
                                                <div className="flex justify-center">
                                                    <ImagePlus className="h-12 w-12 text-gray-400" />
                                                </div>
                                                <div className="text-sm text-gray-600">
                                                    คลิกเพื่ออัพโหลดรูปภาพ
                                                    <p className="text-xs text-gray-500 mt-1">
                                                        PNG, JPG ขนาดไม่เกิน 5MB
                                                    </p>
                                                </div>
                                            </div>
                                        </label>
                                    ) : (
                                        <div className="relative">
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                className="max-h-48 mx-auto rounded-md"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleRemoveImage}
                                                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* ...existing form fields... */}
                        </div>

                        <Separator className="my-6" />

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1 bg-green-600 hover:bg-green-700 transition-colors"
                            >
                                <Save className="mr-2 h-4 w-4" />
                                บันทึก
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="flex-1 border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                            >
                                <Link href={'/stock'} className="flex items-center justify-center w-full">
                                    <X className="mr-2 h-4 w-4" />
                                    ยกเลิก
                                </Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}