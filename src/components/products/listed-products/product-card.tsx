'use client';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { HeartIcon } from '@heroicons/react/24/outline';

interface ProductCardProps {
  id: string;
  image: string;
  category: string;
  title: string;
  price: [number, number];
  isWishlisted: boolean;
}

export function ProductCard({ id, image, category, title, price, isWishlisted }: ProductCardProps) {

  const [isWishlist, setIsWishlist] = useState(isWishlisted);

  return (
    <div 
      className="flex flex-col items-center bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <Link href={`/products/${id}`} className="block w-full mb-4">
        <div className="aspect-square bg-gray-100 relative">
          <Image 
            src={image}
            alt={title}
            fill
            className="object-cover"
          />
        </div>
      
        <div className="px-4 pt-4">
          <span className="text-xs text-azulCraftz">{category}</span>
          <h3 className="text-azulCraftz font-medium text-[18px] mt-1 mb-2 line-clamp-2">{title}</h3>
          
          <div className="text-azulCraftz flex text-[15px] justify-between items-center">
            <div>
              {price[0] === price[1] ? (
                <span className="font-bold">${price[0].toFixed(2)}</span>
              ) : (
                <span className="font-bold">${price[0].toFixed(2)} - ${price[1].toFixed(2)}</span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <button 
        onClick={() => setIsWishlist(!isWishlist)}
        className={`flex items-center justify-center cursor-pointer p-2 rounded-full text-xs font-medium text-foreground text-white
          ${isWishlist ? 'bg-rojoCraftz hover:bg-rojoCraftz/80' : 'bg-button  hover:bg-buttonHover'} 
          transition duration-300 ease-in-out w-11/12 mb-4`}
      >
        <HeartIcon className={isWishlist ? 'h-4 w-4 fill-current mr-1' : 'h-4 w-4 mr-1'} />
        {isWishlist ? 'En lista de deseos': 'Agregar a deseos'}
      </button>
    </div>
  );
}