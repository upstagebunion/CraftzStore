'use client';
import { useSearchParams } from "next/navigation";
import { CategoryFilters } from '@/components/products/categoryFilters'

export default async function Products() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Productos</h1>

      {/* Filtros (client component) */}
      <CategoryFilters currentCategory={category} />

      <p>
        Aqui se listan los productos
      </p>
      {category}
    </div>
  );
}