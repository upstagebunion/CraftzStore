export default async function Products({searchParams}:{searchParams: {[key:string]:string | string[] | undefined}}) {
  const category = await searchParams.category;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Productos</h1>
      <p>
        Aqui se listan los productos
      </p>
      {category}
    </div>
  );
}