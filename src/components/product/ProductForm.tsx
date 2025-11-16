import React, { useState } from 'react';
import { Product } from '../../types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (p: Omit<Product, 'id'>) => void;
  submitLabel: string;
}

export function ProductForm({ product, onSubmit, submitLabel }: ProductFormProps) {
  const [formData, setFormData] = useState({
    ten: product?.ten || '',
    danhMuc: product?.danhMuc || 'Điện tử' as Product['danhMuc'],
    gia: product?.gia?.toString() || '',
    soLuong: product?.soLuong?.toString() || '',
    moTa: product?.moTa || '',
  });
 
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
   
    if (!formData.ten || formData.ten.length < 3) {
      newErrors.ten = 'Tên sản phẩm phải có ít nhất 3 ký tự';
    }
   
    if (!formData.gia || parseFloat(formData.gia) <= 0) {
      newErrors.gia = 'Giá phải là số dương';
    }
   
    if (!formData.soLuong || parseInt(formData.soLuong) <= 0 || !Number.isInteger(parseFloat(formData.soLuong))) {
      newErrors.soLuong = 'Số lượng phải là số nguyên dương';
    }
   
    if (!formData.danhMuc) {
      newErrors.danhMuc = 'Vui lòng chọn danh mục';
    }
   
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({
        ten: formData.ten,
        danhMuc: formData.danhMuc,
        gia: parseFloat(formData.gia),
        soLuong: parseInt(formData.soLuong),
        moTa: formData.moTa,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
      {/* ... (Phần JSX của form giữ nguyên) ... */}
         <div>
          <label className="block text-sm font-medium mb-2">Tên sản phẩm *</label>
          <input
            type="text"
            value={formData.ten}
            onChange={(e) => setFormData({ ...formData, ten: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          {errors.ten && <p className="text-red-500 text-sm mt-1">{errors.ten}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Danh mục *</label>
          <select
            value={formData.danhMuc}
            onChange={(e) => setFormData({ ...formData, danhMuc: e.target.value as Product['danhMuc'] })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          >
            <option value="Điện tử">Điện tử</option>
            <option value="Quần áo">Quần áo</option>
            <option value="Đồ ăn">Đồ ăn</option>
            <option value="Sách">Sách</option>
            <option value="Khác">Khác</option>
          </select>
          {errors.danhMuc && <p className="text-red-500 text-sm mt-1">{errors.danhMuc}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Giá (VNĐ) *</label>
          <input
            type="number"
            value={formData.gia}
            onChange={(e) => setFormData({ ...formData, gia: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          {errors.gia && <p className="text-red-500 text-sm mt-1">{errors.gia}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Số lượng *</label>
          <input
            type="number"
            value={formData.soLuong}
            onChange={(e) => setFormData({ ...formData, soLuong: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          {errors.soLuong && <p className="text-red-500 text-sm mt-1">{errors.soLuong}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Mô tả</label>
          <textarea
            value={formData.moTa}
            onChange={(e) => setFormData({ ...formData, moTa: e.target.value })}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          {submitLabel}
        </button>
    </form>
  );
}
