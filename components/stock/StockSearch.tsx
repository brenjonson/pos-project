// components/stock/StockSearch.tsx
import React, { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const StockSearch: React.FC = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [inputValue, setInputValue] = useState(searchParams.get('stock') || '');
  
  // อัพเดต input value เมื่อ URL เปลี่ยน
  useEffect(() => {
    setInputValue(searchParams.get('stock') || '');
  }, [searchParams]);

  // การจัดการค้นหาด้วย debounce (หน่วงเวลาค้นหาเพื่อลดการ request)
  useEffect(() => {
    const timeout = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (inputValue) {
        params.set('stock', inputValue);
      } else {
        params.delete('stock');
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300); // หน่วงเวลา 500ms

    return () => clearTimeout(timeout);
  }, [inputValue, pathname, replace, searchParams]);

  // ล้างการค้นหา
  const clearSearch = () => {
    setInputValue('');
    const params = new URLSearchParams(searchParams);
    params.delete('stock');
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="ค้นหาสินค้า..."
          className="pl-8 pr-10"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        {inputValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1 h-6 w-6"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};