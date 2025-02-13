'use client'
import { useEffect,useState } from "react"
import { json } from "stream/consumers"
import StockOutList from "./StockOutList"


export default function StockOutFetch() {
    const [stockOuts,setStockOut] = useState([])

    useEffect(()=>{
        const loadStockOut = async ()=>{
            const res = await fetch("api/stockout")
            const data = await res.json();
            setStockOut(data)
            console.log(data)
        }

        loadStockOut() //ถึงขั้นตอนนี้จะรู้ว่าข้อมูลมาถึงหรือยัง
    },[])

  return (
    <div>
        <StockOutList stockOuts={stockOuts}/>
    </div>
  )
}