// pages/stock/index.tsx
'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { StockHeader } from '@/components/stock/StockHeader';
import { StockSearch } from '@/components/stock/StockSearch';
import { StockTable } from '@/components/stock/StockTable';
import type { StockItem } from '@/utils/types';
import StockFetch from '@/components/stock/StockFetch';


export default function Stock({
  searchParams
}:{
  searchParams?:{
    stock?:string;
    page?:string
  }
}) {
  
  return (
    <div>
        <div className="p-6 max-w-6xl mx-auto">
      <Card>
        <StockHeader />
        <CardContent>
          <StockSearch />
          <StockFetch/> 
        </CardContent>
      </Card>
    </div>
    </div>
  )
}







