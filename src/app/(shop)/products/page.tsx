import { ServerStackIcon } from '@heroicons/react/24/outline';
import { ProductCard } from '@/components/products/listed-products/product-card';
import { SearchFilter } from '@/components/products/filters/search-filter';
import { CategoryFilter } from '@/components/products/filters/category-filter';
import { PriceFilter } from '@/components/products/filters/price-filter';
import { FeaturedProducts } from '@/components/products/listed-products/featured-products';
import { PromoBanners } from '@/components/products/listed-products/promo-banners';
import { Pagination } from '@/components/products/listed-products/pagination';

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background2">
        {/* TODO: Adjust the mobile version of page */}
      {/* Mobile Filters Button */}
      <div className="md:hidden sticky top-0 z-10 bg-background p-4 shadow-sm">
        <button className="flex items-center gap-2 text-foreground">
          <ServerStackIcon /> Filtros
        </button>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
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
                {Array.from({ length: 12 }).map((_, i) => (
                  <ProductCard 
                    key={i}
                    id={i.toString()}
                    image={`https://res.cloudinary.com/craftzstorage/image/upload/v1751499155/Shirt_Front_3D_72_ppp4_gaunmu.jpg`}
                    category="Electrónicos"
                    title={`Producto ${i + 1}`}
                    price={[219.00, 269.00]}
                    isWishlisted={i % 3 === 0}
                  />
                ))}
              </div>
            </div>

            {/* Mobile Featured and Banners */}
            <div className="md:hidden space-y-8">
              <FeaturedProducts />
              <PromoBanners />
            </div>

            {/* Pagination */}
            <Pagination currentPage={1} totalPages={5} />
          </main>
        </div>
      </div>
    </div>
  );
}