'use client'

import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useState } from "react";
import { outStock } from "@/actions/actions";

import { StockOutHeader } from './StcokOutHeader';
import StockOutForm from './StockOutForm';


export default function Stockout() {
    const [selectedUnit, setSelectedUnit] = useState('');

    const handleSelectChange = (value) => {
        setSelectedUnit(value);
    };

    const handleSubmit = async (formData) => {
        await outStock(formData);
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8">
            <div className="max-w-2xl mx-auto px-4">
                <Card className="backdrop-blur-sm bg-white/90 shadow-xl">
                    <StockOutHeader />
                    <CardContent>
                        <StockOutForm />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}