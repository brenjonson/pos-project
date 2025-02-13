import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Scale } from 'lucide-react';

export function UnitSelect({ onValueChange }) {
  return (
    <div className="space-y-2">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <Scale className="w-4 h-4 text-indigo-600" />
        หน่วย
      </label>
      <Select name="unit" onValueChange={onValueChange}>
        <SelectTrigger id="unit">
          <SelectValue placeholder="เลือกหน่วย" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="kg">กิโลกรัม (กก.)</SelectItem>
          <SelectItem value="g">กรัม (ก.)</SelectItem>
          <SelectItem value="piece">ชิ้น</SelectItem>
          <SelectItem value="pack">แพ็ค</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}