import React from 'react';

interface FilterProps {
  category: string;
  onCategoryChange: (v: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (v: string) => void;
  onMaxPriceChange: (v: string) => void;
}

export function Filter({
  category,
  onCategoryChange,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange
}: FilterProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Danh mục</label>
        <select 
          value={category} 
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
        >
          <option value="">Tất cả</option>
          <option value="Điện tử">Điện tử</option>
          <option value="Quần áo">Quần áo</option>
          <option value="Đồ ăn">Đồ ăn</option>
          <option value="Sách">Sách</option>
          <option value="Khác">Khác</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Khoảng giá</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Giá min"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
          <input
            type="number"
            placeholder="Giá max"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
