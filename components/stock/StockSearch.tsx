// components/stock/StockSearch.tsx
'use client'
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce'

interface StockSearchProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

export const StockSearch: React.FC<StockSearchProps> = () => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const [search,setSearch] = useState(searchParams.get('stock')?.toString() || '')
  
  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams)
    if(value){
      params.set('stock',value)
    }else{
      params.delete('stock')
    }
    replace(`/stock?${params.toString()}`)

  },500);


  console.log(searchParams.get('stock'))

  useEffect(()=>{
    //code body
    if(!searchParams.get('stock')){
      setSearch('')
    }
  },[searchParams.get('stock')])

  return (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
        <Input
          placeholder="ค้นหาสินค้า..."
          className="pl-8"
         onChange={(e)=>{
            setSearch(e.target.value)
            handleSearch(e.target.value)
         }} 
         value={search}
        />
      </div>
    </div>
  );
};
