'use client';
import { useRouter, usePathname } from 'next/navigation';

export function CategoryFilters({ currentCategory }: { currentCategory?: string | undefined | null }) {
  const router = useRouter();
  const pathname = usePathname();

  const categories = [
    { slug: 'shirts', name: 'Camisetas' },
    { slug: 'pants', name: 'Pantalones' },
    { slug: 'accessories', name: 'Accesorios' },
  ];

  const handleFilter = (category: string) => {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleFilter('')}
        className={`px-4 py-2 rounded-full ${
          !currentCategory 
            ? 'bg-blue-600 text-white' 
            : 'bg-gray-200 hover:bg-gray-300'
        }`}
      >
        Todos
      </button>
      
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleFilter(cat.slug)}
          className={`px-4 py-2 rounded-full ${
            currentCategory === cat.slug
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300'
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}