'use client';
import { useSearchParams } from "next/navigation";
import { Suspense } from 'react';

export default function ProductDetail() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return (
    <div>Detalles del producto: 
        <Suspense>
            {id}
        </Suspense>
    </div>
    );
}
