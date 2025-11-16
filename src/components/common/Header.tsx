import React from 'react';
import { Link } from 'react-router-dom';

export function Header() {
  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold">📦 Quản Lý Sản Phẩm</Link>
          <nav className="flex gap-4">
            <Link to="/" className="hover:text-blue-200 transition">Trang chủ</Link>
            <Link to="/add" className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition">
              + Thêm Sản Phẩm
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
