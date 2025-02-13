'use client'

import { useEffect,useState } from "react"
import { json } from "stream/consumers"
import StockInList from "./StockInList"



export default function StockInFetch() {
    const [stockIns,setStockIn] = useState([])

    useEffect(()=>{
        const loadStockIn = async ()=>{
            const res = await fetch("api/stockin")
            const data = await res.json();
            setStockIn(data)
            console.log(data)
        }

        loadStockIn() //ถึงขั้นตอนนี้จะรู้ว่าข้อมูลมาถึงหรือยัง
    },[])
  
    return (
    <div>
        <StockInList stockIns={stockIns}/>
    </div>
  )
}