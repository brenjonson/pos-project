"use client";
import { useEffect, useState } from "react"; //เอาไว้ใช้ส่งข้อมูล API
import StockList from "./StockList";

export default function StockFetch() {
  const [stocks, setStocks] = useState([]);
  //
  useEffect(() => {
    const loadStocks = async () => {
      const res = await fetch("/api/stock"); //เรียก API ให้ไป fetch ข้อมูลที่ api
      const data = await res.json();
      setStocks(data); // อัปเดต state หลังจาก render เสร็จ
    };

    loadStocks();
  }, []);

  return (
    <div>
      <StockList stocks={stocks} />
    </div>
  );
}
