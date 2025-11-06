import { notFound } from 'next/navigation';
import { apiService } from '@/lib/api';
import { ProductoOnline } from '@/types/product';
import { ProductDetailsComponent } from '@/components/products/product-details-component';

interface ProductPageProps {
  params: Promise<{
    productId: string;
  }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  try {
    const producto = await apiService.getProductoBySlug(productId) as ProductoOnline;
    
    if (!producto) {
      notFound();
    }

    return (
      <div className="min-h-screen bg-background2">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <ProductDetailsComponent producto={producto} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error loading product:', error);
    notFound();
  }
}