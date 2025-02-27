import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CancelStockInDialogProps {
    stockIn: any; // ควรกำหนด type ที่ชัดเจน
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (note: string) => Promise<void>;
}

export function CancelStockInDialog({
    stockIn,
    isOpen,
    onClose,
    onConfirm
}: CancelStockInDialogProps) {
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleConfirm = async () => {
        try {
            setIsLoading(true);
            await onConfirm(note);
            onClose();
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>ยืนยันการยกเลิกรายการนำเข้า</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <p>คุณต้องการยกเลิกรายการนำเข้ารหัส {stockIn?.stockInID} ใช่หรือไม่?</p>
                    <div className="space-y-2">
                        <Label>หมายเหตุการยกเลิก (จำเป็น)</Label>
                        <Input
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="ระบุเหตุผลการยกเลิก"
                            required
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleConfirm}
                        disabled={!note || isLoading}
                    >
                        {isLoading ? "กำลังยกเลิก..." : "ยืนยันการยกเลิก"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}