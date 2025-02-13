// components/stock/StockSearch.tsx
import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface StockSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const StockSearch: React.FC<StockSearchProps> = () => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="ค้นหาสินค้า..."
          className="pl-8"
          // value={searchTerm}
          // onChange={(e) => (e.target.value)}
        />
      </div>
    </div>
  );
};
