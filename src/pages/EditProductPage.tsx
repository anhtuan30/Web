import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { ProductForm } from '../components/product/ProductForm';
import { Product } from '../types';

export function EditProductPage() {
  const { id } = useParams();
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();
 
  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h2>
        <button onClick={() => navigate('/')} className="bg-blue-600 text-white px-6 py-2 rounded-lg">
          Quay lại trang chủ
        </button>
      </div>
    );
  }

  const handleSubmit = (productData: Omit<Product, 'id'>) => {
    dispatch({ 
      type: 'UPDATE_PRODUCT', 
      payload: { ...productData, id: product.id } 
    });
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <button onClick={() => navigate(`/products/${product.id}`)} className="text-blue-600 hover:underline mb-6">
        ← Quay lại
      </button>
      <h1 className="text-3xl font-bold mb-6">Chỉnh Sửa Sản Phẩm</h1>
      <ProductForm product={product} onSubmit={handleSubmit} submitLabel="Cập nhật sản phẩm" />
    </div>
  );
}
