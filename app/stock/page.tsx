// pages/stock/index.tsx
'use client'

import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { StockHeader } from '@/components/stock/StockHeader';
import { StockSearch } from '@/components/stock/StockSearch';
import { StockTable } from '@/components/stock/StockTable';
import type { StockItem } from '@/utils/types';
import StockFetch from '@/components/stock/StockFetch';


export default function Stock() {
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
        {/* <StockFetch/> */}
    </div>
  )
}








// export default function StockManagement() {
//   const [stockItems, setStockItems] = useState<StockItem[]>([
//     { id: 1, name: 'เนื้อวัว', quantity: 50, unit: 'กก.', minQuantity: 20 },
//     { id: 2, name: 'เนื้อหมู', quantity: 45, unit: 'กก.', minQuantity: 20 },
//     { id: 3, name: 'ผักกาดขาว', quantity: 30, unit: 'กก.', minQuantity: 15 },
//     { id: 4, name: 'เห็ดเข็มทอง', quantity: 25, unit: 'กก.', minQuantity: 10 },
//   ]);

//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredItems = stockItems.filter(item =>
//     item.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleAddNew = () => {
//     // TODO: Implement add new item logic
//     console.log('Add new item');
//   };

//   const handleRefresh = () => {
//     // TODO: Implement refresh logic
//     console.log('Refresh data');
//   };

//   const handleEdit = (item: StockItem) => {
//     // TODO: Implement edit logic
//     console.log('Edit item:', item);
//   };

//   const handleDelete = (item: StockItem) => {
//     // TODO: Implement delete logic
//     console.log('Delete item:', item);
//   };




//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <Card>
//         <StockHeader onAddNew={handleAddNew} onRefresh={handleRefresh} />
//         <CardContent>
//           <StockSearch 
//             searchTerm={searchTerm} 
//             onSearch={setSearchTerm} 
//           />
//           <StockTable 
//             items={filteredItems}
//             onEdit={handleEdit}
//             onDelete={handleDelete}
//           />
//         </CardContent>
//       </Card>
//     </div>
//   );
// }