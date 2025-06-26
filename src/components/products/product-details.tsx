'use client';
import { useSearchParams } from "next/navigation";

export async function ProductDetails(){
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    return(
        <p> {id} </p>
        
    );
}