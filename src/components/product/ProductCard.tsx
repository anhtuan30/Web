import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../../types';

export function ProductCard({ product }: { product: Product }) {
  const navigate = useNavigate();
 
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
      <div className="bg-gradient-to-br from-blue-400 to-blue-600 h-40 flex items-center justify-center">
        <span className="text-6xl">📦</span>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg line-clamp-1">{product.ten}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">{product.danhMuc}</span>
        </div>
        <p className="text-2xl font-bold text-blue-600 mb-2">
          {product.gia.toLocaleString('vi-VN')}đ
        </p>
        <p className="text-sm text-gray-600 mb-3">Còn lại: {product.soLuong} sản phẩm</p>
        <button
          onClick={() => navigate(`/products/${product.id}`)}
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Xem chi tiết
        </button>
      </div>
    </div>
  );
}
