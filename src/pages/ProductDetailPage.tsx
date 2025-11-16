import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';

export function ProductDetailPage() {
  const { id } = useParams();
  const { products, dispatch } = useProducts();
  const navigate = useNavigate();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
 
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

  const handleDelete = () => {
    dispatch({ type: 'DELETE_PRODUCT', payload: product.id });
    navigate('/');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <button onClick={() => navigate('/')} className="text-blue-600 hover:underline mb-6">
        ← Quay lại
      </button>
     
      <div className="bg-white rounded-lg shadow-lg p-8">
        {/* ... (Phần JSX chi tiết sản phẩm giữ nguyên) ... */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg h-96 flex items-center justify-center">
            <span className="text-9xl">📦</span>
          </div>
         
          <div>
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{product.ten}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg">{product.danhMuc}</span>
            </div>
           
            <p className="text-4xl font-bold text-blue-600 mb-4">
              {product.gia.toLocaleString('vi-VN')}đ
            </p>
           
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Số lượng:</span> {product.soLuong} sản phẩm
              </p>
              <p className="text-gray-600 mb-2">
                <span className="font-semibold">Mã sản phẩm:</span> #{product.id}
              </p>
            </div>
           
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Mô tả:</h3>
              <p className="text-gray-700">{product.moTa}</p>
            </div>
           
            <div className="flex gap-4">
              <button
                onClick={() => navigate(`/edit/${product.id}`)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                ✏️ Chỉnh sửa
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
              >
                🗑️ Xóa
              </button>
            </div>
          </div>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* ... (Phần JSX của Modal xác nhận xóa giữ nguyên) ... */}
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md">
            <h3 className="text-xl font-bold mb-4">Xác nhận xóa</h3>
            <p className="text-gray-600 mb-6">
              Bạn có chắc chắn muốn xóa sản phẩm "{product.ten}"?
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 bg-gray-300 py-2 rounded-lg hover:bg-gray-400 transition"
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
              >
                Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
