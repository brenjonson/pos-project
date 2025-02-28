"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import StockList from "./StockList";

export default function StockFetch() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get('stock') || '';
  
  useEffect(() => {
    const loadStocks = async () => {
      setLoading(true);
      try {
        // ส่งคำค้นหาไปยัง API โดยตรง
        const res = await fetch(`/api/stock?search=${encodeURIComponent(searchTerm)}`);
        const data = await res.json();
        setStocks(data);
      } catch (error) {
        console.error("Error fetching stocks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStocks();
  }, [searchTerm]); // ทำการดึงข้อมูลใหม่เมื่อคำค้นหาเปลี่ยน

  return (
    <div>
      {loading ? (
        <div className="text-center py-4">กำลังโหลดข้อมูล...</div>
      ) : (
        <StockList stocks={stocks} />
      )}
    </div>
  );
}