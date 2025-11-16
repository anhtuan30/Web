import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductContext';
import { SearchBar } from '../components/product/SearchBar';
import { Filter } from '../components/product/Filter';
import { ProductList } from '../components/product/ProductList';
import { Pagination } from '../components/common/Pagination';

export function HomePage() {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredProducts = products.filter(p => {
    const matchSearch = p.ten.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCategory = !category || p.danhMuc === category;
    const matchMinPrice = !minPrice || p.gia >= parseFloat(minPrice);
    const matchMaxPrice = !maxPrice || p.gia <= parseFloat(maxPrice);
    return matchSearch && matchCategory && matchMinPrice && matchMaxPrice;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, category, minPrice, maxPrice]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>
     
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <Filter
            category={category}
            onCategoryChange={setCategory}
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={setMinPrice}
            onMaxPriceChange={setMaxPrice}
          />
        </div>
       
        <div className="lg:col-span-3">
          <ProductList products={paginatedProducts} />
          
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredProducts.length}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  );
}
