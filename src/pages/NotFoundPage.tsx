import React from 'react';
import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h2 className="text-2xl font-bold mb-4">404 - Không tìm thấy trang</h2>
      <Link to="/" className="text-blue-600 hover:underline">Quay lại trang chủ</Link>
    </div>
  );
}
