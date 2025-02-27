import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Stock } from "@prisma/client";
import { Edit } from "lucide-react";

interface EditStockDialogProps {
    stock: Stock;
    isOpen: boolean;
    isLoading: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmit: (formData: FormData) => Promise<void>;
}

export function EditStockDialog({ stock, isOpen, isLoading, onOpenChange, onSubmit }: EditStockDialogProps) {

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>แก้ไขข้อมูลวัตถุดิบ</DialogTitle>
                </DialogHeader>
                <form action={onSubmit} className="space-y-4">
                    <div>
                        <Label htmlFor="ingredientName">ชื่อวัตถุดิบ</Label>
                        <Input
                            id="ingredientName"
                            name="ingredientName"
                            defaultValue={stock.ingredientName}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="costPrice">ราคาต้นทุน</Label>
                        <Input
                            id="costPrice"
                            name="costPrice"
                            type="number"
                            step="0.01"
                            defaultValue={stock.costPrice}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="unit">หน่วย</Label>
                        <Input
                            id="unit"
                            name="unit"
                            defaultValue={stock.Unit}
                            required
                        />
                    </div>
                    <div>
                        <Label htmlFor="minQuantity">จำนวนขั้นต่ำ</Label>
                        <Input
                            id="minQuantity"
                            name="minQuantity"
                            type="number"
                            defaultValue={stock.minQuantity}
                            required
                        />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "กำลังบันทึก..." : "บันทึก"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
}