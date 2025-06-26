'use client';
import { useSearchParams } from "next/navigation";

export default function ProductDetail() {
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    return <div>Detalles del producto: {id}</div>;
}
