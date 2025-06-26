'use client';
import { useSearchParams } from "next/navigation";
import { CategoryFilters } from '@/components/products/categoryFilters'
import { Suspense } from 'react';

export default function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Productos</h1>

      {/* Filtros (client component) */}
      <Suspense>
        <CategoryFilters currentCategory={category} />
      </Suspense>
      <p>
        Aqui se listan los productos
      </p>
      {category}
    </div>
  );
}