import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className="flex justify-center mt-8">
      <nav className="flex items-center gap-1">
        <button className="cursor-pointer px-3 py-1 rounded border disabled:opacity-50 hover:bg-foreground hover:text-background transition">
          Anterior
        </button>
        
        {Array.from({ length: totalPages }).map((_, i) => (
          <Link
            key={i}
            href={`/products?page=${i + 1}`}
            className={`w-10 h-10 flex items-center justify-center rounded ${currentPage === i + 1 ? 'bg-primary text-white' : 'border hover:bg-foreground hover:text-background'}`}
          >
            {i + 1}
          </Link>
        ))}
        
        <button className="cursor-pointer px-3 py-1 rounded border disabled:opacity-50 hover:bg-foreground hover:text-background transition">
          Siguiente
        </button>
      </nav>
    </div>
  );
}