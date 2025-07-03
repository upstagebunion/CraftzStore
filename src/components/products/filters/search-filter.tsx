'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export function SearchFilter() {
  return (
    <div className="bg-background p-4 rounded-lg shadow-sm">
      <h3 className="font-medium mb-3">Buscar productos</h3>
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-rojoCraftz focus:border-rojoCraftz"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-3 text-foreground h-5 w-5" />
      </div>
    </div>
  );
}