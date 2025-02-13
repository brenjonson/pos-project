export interface StockItem {
    id: number;
    name: string;
    quantity: number;
    unit: string;
    minQuantity: number;
}

export interface StockListProps {
    stocks: { ingredientName: string }[]; // stocks เป็น array ของ object
}

export interface stock_InProps {
    stockInID: number;
    stockInDateTime: string;
    totalPrice: number;
    Employee_empID: number;
    employee?: {
        name: string;
        // ข้อมูลอื่นๆ ของพนักงาน
    };
    note?: string;
}

