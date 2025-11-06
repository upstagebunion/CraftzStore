export function FeaturedProducts() {
  return (
    <div className="bg-background p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-lg mb-4">Productos Destacados</h3>
      <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="text-center">
            <div className="aspect-square bg-gray-100 mb-2 rounded"></div>
            <h4 className="text-sm font-medium">Producto {i+1}</h4>
            <p className="text-sm text-foreground/80">$19.99</p>
          </div>
        ))}
      </div>
    </div>
  );
}