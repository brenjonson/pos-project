import { FileText, DollarSign, User } from 'lucide-react';
import { formatPrice,formatDateTime } from '@/lib/utils';
import StatCard from '../stockin/StatCard';

export default function StockOutStat({data}) {
    const totalPrice = data.reduce((sum, item) => sum + item.totalPrice, 0);
    const uniqueEmployees = new Set(data.map(item => item.Employee_empID)).size;

  return (
   <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 ">
         <StatCard 
           icon={<FileText className="w-5 h-5 text-blue-600" />}
           label="จำนวนรายการ"
           value={`${data.length} รายการ`}
           bgColor="blue"
         />
         
         <StatCard 
           icon={<User className="w-5 h-5 text-purple-600" />}
           label="พนักงานทั้งหมด"
           value={`${uniqueEmployees} คน`}
           bgColor="purple"
         />
       </div>
  )
}