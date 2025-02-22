// hooks/useStockInForm.ts
import { useState } from 'react';
import { StockInFormData, StockInItem } from '@/utils/types';

let itemCounter = 0; // Counter for generating unique IDs

const createNewItem = (): StockInItem => ({
  // ใช้ counter แทน Math.random()
  id: `item-${itemCounter++}`,
  ingredientName: '',
  quantity: '',
  unit: '',
  pricePerUnit: '',
  totalPrice: '0'
});

export const useStockInForm = () => {
  const [formData, setFormData] = useState<StockInFormData>({
    stockInId: '',
    items: [createNewItem()],
    employee: '',
    note: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemUpdate = (itemId: string, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.map(item => {
        if (item.id !== itemId) return item;
        
        const updatedItem = { ...item, [field]: value };
        
        // Calculate total price if quantity or price per unit changes
        if (field === 'quantity' || field === 'pricePerUnit') {
          const quantity = field === 'quantity' ? value : item.quantity;
          const pricePerUnit = field === 'pricePerUnit' ? value : item.pricePerUnit;
          updatedItem.totalPrice = (parseFloat(quantity || '0') * parseFloat(pricePerUnit || '0')).toString();
        }
        
        return updatedItem;
      })
    }));
  };

  const addNewItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, createNewItem()]
    }));
  };

  const deleteItem = (itemId: string) => {
    setFormData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== itemId)
    }));
  };

  return {
    formData,
    handleInputChange,
    handleItemUpdate,
    addNewItem,
    deleteItem
  };
};