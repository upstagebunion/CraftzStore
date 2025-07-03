import { CategoryFilters } from '@/components/products/categoryFilters'
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Productos"
}

export default async function Products({ searchParams }: {searchParams: Promise<{category: string}>;}) {
  
  const { category } = await searchParams;
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Productos</h1>

      {/* Filtros (client component) */}
      <Suspense fallback={
        <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
          <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Cargando productos...</p>
        </div>
      }>
        <CategoryFilters />
      </Suspense>
      <p>
        Aqui se listan los productos, category { category }
      </p>
      {/*category*/}
    </div>
  );
}