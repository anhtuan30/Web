import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components/product/ProductForm';
import { Product } from '../types';

export function AddProductPage() {
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...productData,
      id: Math.max(...products.map(p => p.id), 0) + 1,
    };
    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button onClick={() => navigate('/')} className="text-blue-600 hover:underline mb-6">
        ← Quay lại
      </button>
      <h1 className="text-3xl font-bold mb-6">Thêm Sản Phẩm Mới</h1>
      <ProductForm onSubmit={handleSubmit} submitLabel="Thêm sản phẩm" />
    </div>
  );
}
