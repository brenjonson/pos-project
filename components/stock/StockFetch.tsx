// components/stock/StockFetch.tsx
"use client";
import { useEffect, useState } from "react"; // เอาไว้ใช้ส่งข้อมูล API
import StockList from "./StockList";

export default function StockFetch({ stock }: { stock?: string }) {
  const [stocks, setStocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        setIsLoading(true);
        console.log('Search term in component:', stock);

        const url = stock 
          ? `/api/stock?stock=${encodeURIComponent(stock)}`
          : "/api/stock"; // ถ้าไม่มี stock ส่งค่าเป็น /api/stock

        console.log("Fetching URL:", url);
        const res = await fetch(url);
        const data = await res.json();

        console.log('Received data:', data);
        setStocks(data);
      } catch (error) {
        console.error("Error loading stocks:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadStocks();
  }, [stock]);

  if (isLoading) {
    return <div>กำลังโหลด...</div>;
  }

  return (
    <div>
      <StockList stocks={stocks} />
    </div>
  );
}
