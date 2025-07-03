export function PromoBanners() {
  return (
    <div className="space-y-4">
      <div className="bg-background p-6 rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Oferta Especial</h3>
        <p className="text-foreground mb-3">20% de descuento en electrónicos</p>
        <button className="cursor-pointer bg-primary text-white px-4 py-2 rounded-lg text-sm hover:bg-primary2">
          Ver Oferta
        </button>
      </div>
      
      <div className="bg-green-900 p-6 rounded-lg text-center">
        <h3 className="font-bold text-lg mb-2">Envío Gratis</h3>
        <p className="text-foreground">En compras mayores a $699.00</p>
      </div>
    </div>
  );
}