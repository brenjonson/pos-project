import { NextRequest, NextResponse } from "next/server";
import { fetchStock } from "@/actions/actions";  // import ฟังก์ชัน fetchStock

export async function GET(request: NextRequest) {
  try {
    // ดึง query parameters จาก URL
    const searchParams = request.nextUrl.searchParams;
    const stock = searchParams.get('stock');
    
    console.log('API received search term:', stock); // log เพื่อดูว่ามีค่าหรือไม่

    // เรียก fetchStock เพื่อดึงข้อมูลจากฐานข้อมูล
    const stocks = await fetchStock(stock || ''); // ถ้าไม่มี 'stock' จะส่งเป็น string ว่าง

    // ตรวจสอบว่า stocks ที่ได้รับเป็น array หรือไม่
    if (!Array.isArray(stocks)) {
      console.error("Invalid response from fetchStock:", stocks);
      return NextResponse.json({ message: 'Invalid data format received from fetchStock' }, { status: 500 });
    }

    // ส่งผลลัพธ์เป็น JSON
    return NextResponse.json(stocks);

  } catch (error) {
    // ในกรณีเกิดข้อผิดพลาด
    console.error("API Error:", error);

    // ส่ง response ว่ามีข้อผิดพลาด พร้อมกับข้อมูลข้อผิดพลาด
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Internal server error', error: String(error) }, { status: 500 });
    }
  }
}
