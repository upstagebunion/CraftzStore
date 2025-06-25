export default async function ProductDetail({params} : {params:{id:string}}) {
    const { id } = await params;
    return <div>Detalles del producto: {id}</div>;
}
