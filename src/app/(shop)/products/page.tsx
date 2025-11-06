import { Metadata } from 'next';
import { ServerStackIcon } from '@heroicons/react/24/outline';
import { ProductCard } from '@/components/products/listed-products/product-card';
import { SearchFilter } from '@/components/products/filters/search-filter';
import { CategoryFilter } from '@/components/products/filters/category-filter';
import { PriceFilter } from '@/components/products/filters/price-filter';
import { FeaturedProducts } from '@/components/products/listed-products/featured-products';
import { PromoBanners } from '@/components/products/listed-products/promo-banners';
import { Pagination } from '@/components/products/listed-products/pagination';
import { apiService } from '@/lib/api';
import { ProductoOnline } from '@/types/product';

export const metadata: Metadata = {
  title: "Productos"
}

interface ProductsPageProps {
  searchParams: Promise<{
    categoria?: string;
    destacado?: string;
    etiqueta?: string;
    page?: string;
    search?: string;
  }>;
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = parseInt(params.page || '1');
  const limit = 12;
  
  try {
    const response = await apiService.getProductos({
      categoria: params.categoria,
      destacado: params.destacado === 'true',
      etiqueta: params.etiqueta,
      search: params.search,
      page,
      limit,
    }) as {
      productos: ProductoOnline[];
      total: number;
      paginas: number;
      paginaActual: number;
    };

    const { productos, paginas, paginaActual } = response;
  return (
    <div className="min-h-screen bg-background2">
        {/* TODO: Adjust the mobile version of page */}
      {/* Mobile Filters Button */}
      <div className="md:hidden sticky top-0 z-10 bg-background p-4 shadow-sm">
        <button className="flex items-center gap-2 text-foreground">
          <ServerStackIcon /> Filtros
        </button>
      </div>

      <div className="mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-5">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24 space-y-8">
              <SearchFilter />
              <CategoryFilter />
              <PriceFilter />
              <FeaturedProducts />
              <PromoBanners />
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Mobile Filters Content (collapsible) */}
            <div className="md:hidden mb-8">
              <SearchFilter />
              <CategoryFilter />
              <PriceFilter />
            </div>

            {/* Product Grid */}
            <div className="mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {productos.map((producto) => {
                  const imagenPrincipal = producto.imagenes?.find(img => img.esPrincipal)?.url || 
                                        producto.imagenes?.[0]?.url || 
                                        producto.productoBase?.imagenes?.find(img => img.esPrincipal)?.url ||
                                        producto.productoBase?.imagenes?.[0]?.url ||
                                        'https://res.cloudinary.com/craftzstorage/image/upload/v1751499155/Shirt_Front_3D_72_ppp4_gaunmu.jpg';
                  
                  return (
                    <ProductCard 
                      key={producto._id}
                      id={producto.slug}
                      image={imagenPrincipal}
                      category={producto.categorias?.[0]?.nombre || producto.productoBase?.categoria?.nombre || 'Sin categoría'}
                      title={producto.nombre}
                      price={[producto.precioMinimo, producto.precioMaximo]}
                      isWishlisted={false}
                    />
                  );
                })}
              </div>
            </div>

            {/* Mobile Featured and Banners */}
            <div className="md:hidden space-y-8">
              <FeaturedProducts />
              <PromoBanners />
            </div>

            {/* Pagination */}
            <Pagination currentPage={paginaActual} totalPages={paginas} />
          </main>
        </div>
      </div>
    </div>
  );
  } catch (error) {
    console.error('Error loading products:', error);
    return (
      <div className="min-h-screen bg-background2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Error al cargar productos</h2>
          <p className="text-muted-foreground">Por favor, intenta de nuevo más tarde.</p>
        </div>
      </div>
    );
  }
}