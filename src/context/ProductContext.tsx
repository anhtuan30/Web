import React, { createContext, useReducer, useContext } from 'react';
import { Product, ProductAction, ProductContextType } from '../types';


const initialProducts: Product[] = [
  { id: 1, ten: 'iPhone 15 Pro', danhMuc: 'Điện tử', gia: 25000000, soLuong: 10, moTa: 'Điện thoại thông minh cao cấp với chip A17 Pro' },
  { id: 2, ten: 'Áo Thun Nam', danhMuc: 'Quần áo', gia: 150000, soLuong: 50, moTa: 'Áo thun cotton 100% thoáng mát' },
  { id: 3, ten: 'Bánh mì Sandwich', danhMuc: 'Đồ ăn', gia: 25000, soLuong: 30, moTa: 'Bánh mì tươi ngon với nhiều nhân' },

];


const ProductContext = createContext<ProductContextType | undefined>(undefined);

function productReducer(state: Product[], action: ProductAction): Product[] {
  switch (action.type) {
    case 'ADD_PRODUCT':
      return [...state, action.payload];
    case 'UPDATE_PRODUCT':
      return state.map(p => p.id === action.payload.id ? action.payload : p);
    case 'DELETE_PRODUCT':
      return state.filter(p => p.id !== action.payload);
    default:
      return state;
  }
}

export function ProductProvider({ children }: { children: React.ReactNode }) {
  const [products, dispatch] = useReducer(productReducer, initialProducts);
  return (
    <ProductContext.Provider value={{ products, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used within ProductProvider');
  return context;
}
