import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { AlertCircle } from "lucide-react";

interface DeleteConfirmDialogProps {
    isOpen: boolean;
    isLoading: boolean;
    stockName: string;
    onOpenChange: (open: boolean) => void;
    onConfirm: () => Promise<void>;
}

export function DeleteConfirmDialog({
    isOpen,
    isLoading,
    stockName,
    onOpenChange,
    onConfirm
}: DeleteConfirmDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="h-5 w-5" />
                        ยืนยันการลบ
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className="py-4">
                    คุณต้องการลบ &quot;{stockName}&quot; ใช่หรือไม่?
                    <br />
                    การดำเนินการนี้ไม่สามารถย้อนกลับได้
                </DialogDescription>
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        disabled={isLoading}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        type="button"
                        variant="destructive"
                        onClick={onConfirm}
                        disabled={isLoading}
                    >
                        {isLoading ? "กำลังลบ..." : "ลบ"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}