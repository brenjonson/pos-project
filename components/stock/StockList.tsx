// เพิ่ม type ให้ props อย่างถูกต้อง
import { StockListProps } from "@/utils/types";
import StockCard from "./StockCard";


export default function StockList({ stocks }: StockListProps) { // ✅ รับ props ถูกต้อง
  

  return (
    <div>
      {
        stocks.map((stock)=>{
          
          return <StockCard stock = {stock} key={stock.stockID}/>
        })
      }
    </div>
  );
}
