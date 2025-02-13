import { Card,CardHeader,CardTitle } from "../ui/card";
import { Package2, UserCircle, ClipboardList, Scale, Box, StickyNote } from 'lucide-react';

export function StockOutHeader() {
    return (
        <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-gray-800">
                <div className="flex items-center justify-center gap-2 mb-2">
                    <ClipboardList className="w-8 h-8 text-indigo-600" />
                    <span>บันทึกการเบิกของ</span>
                </div>
                <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
            </CardTitle>
        </CardHeader>
    );
}