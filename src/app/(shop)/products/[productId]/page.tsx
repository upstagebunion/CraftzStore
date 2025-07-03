import { Suspense } from 'react';
import { ProductDetails } from '@/components/products/product-details';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "{Tipo de producto} {Diseno de producto} {caracteristicas clave}"
  /*Ecample: Playera Manga Corta Cheemzilla - 100% algodon*/
}

export default async function ProductDetail({ params } : {params: Promise<{ productId: string }>;}) {
    const { productId } = await params;
    return (
    <div>Detalles del producto: 
        <Suspense fallback={
            <div className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-gray-100"></div>
            <p className="ml-4 text-lg text-gray-700 dark:text-gray-300">Cargando productos...</p>
            </div>
        }>
            <ProductDetails id = {productId}/>
        </Suspense>
    </div>
    );
}
