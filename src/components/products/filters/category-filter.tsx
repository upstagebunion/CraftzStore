'use client';

import { useState } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const categories = [
  {
    name: "Electrónicos",
    subcategories: ["Smartphones", "Laptops", "Audio", "Accesorios"]
  },
  {
    name: "Hogar",
    subcategories: ["Muebles", "Decoración", "Cocina", "Jardín"]
  },
  // Más categorías...
];

export function CategoryFilter() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  return (
    <div className="bg-background p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-lg mb-3">Categorías</h3>
      <div className="max-h-96 overflow-y-auto">
        {categories.map((category) => (
          <div key={category.name} className="mb-2 last:mb-0 ">
            <button
              className="flex cursor-pointer items-center justify-between w-full py-2 px-2 text-left rounded-sm hover:bg-white/20"
              onClick={() => setOpenCategory(openCategory === category.name ? null : category.name)}
            >
              <span>{category.name}</span>
              {openCategory === category.name ? <ChevronUpIcon className='h-5 w-5'/> : <ChevronDownIcon className='h-5 w-5'/>}
            </button>
            
            {openCategory === category.name && (
              <div className="ml-4 mt-1 space-y-1">
                {category.subcategories.map((sub) => (
                  <label key={sub} className="flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="rounded text-rojoCraftz" />
                    <span className="text-sm">{sub}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}