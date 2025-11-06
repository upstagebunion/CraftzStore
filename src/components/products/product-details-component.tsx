'use client';

import { useState } from 'react';
import { ShoppingCartIcon, HeartIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ProductoOnline, Variante, Calidad, Color, Talla } from '@/types/product';

interface ProductDetailsComponentProps {
  producto: ProductoOnline;
}

export function ProductDetailsComponent({ producto }: ProductDetailsComponentProps) {
  const [selectedVariante, setSelectedVariante] = useState<Variante | null>(null);
  const [selectedCalidad, setSelectedCalidad] = useState<Calidad | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedTalla, setSelectedTalla] = useState<Talla | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quantity, setQuantity] = useState(1);

  // Get available variants
  const availableVariantes = producto.productoBase.variantes?.filter(v => v.disponibleOnline) || [];
  const availableCalidades = selectedVariante?.calidades?.filter(c => c.disponibleOnline) || [];
  const availableColores = selectedCalidad?.colores?.filter(c => c.disponibleOnline) || [];
  const availableTallas = selectedColor?.tallas?.filter(t => t.disponibleOnline && t.stock > 0) || [];

  // Get current price
  const getCurrentPrice = () => {
    if (selectedTalla) return selectedTalla.costo;
    if (selectedColor && selectedColor.costo) return selectedColor.costo;
    return producto.precioMinimo;
  };

  // Get available stock
  const getAvailableStock = () => {
    if (selectedTalla) return selectedTalla.stock;
    if (selectedColor && selectedColor.stock) return selectedColor.stock;
    return 0;
  };

  // All images (product + base product)
  const allImages = [
    ...(producto.imagenes || []),
    ...(producto.productoBase.imagenes || [])
  ].sort((a, b) => a.orden - b.orden);

  const currentImage = allImages[selectedImageIndex]?.url || 'https://via.placeholder.com/600x600?text=Sin+Imagen';

  const handleAddToCart = () => {
    if (!selectedVariante || !selectedCalidad || !selectedColor) {
      alert('Por favor selecciona todas las opciones del producto');
      return;
    }

    if (availableTallas.length > 0 && !selectedTalla) {
      alert('Por favor selecciona una talla');
      return;
    }

    // TODO: Implement cart functionality
    console.log('Add to cart:', {
      producto: producto._id,
      variante: selectedVariante._id,
      calidad: selectedCalidad._id,
      color: selectedColor._id,
      talla: selectedTalla?._id,
      quantity
    });
    alert('Producto agregado al carrito (funcionalidad pendiente)');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Images */}
      <div className="space-y-4">
        <div className="aspect-square bg-card rounded-lg overflow-hidden">
          <img
            src={currentImage}
            alt={producto.nombre}
            className="w-full h-full object-cover"
          />
        </div>
        
        {allImages.length > 1 && (
          <div className="grid grid-cols-4 gap-2">
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`aspect-square bg-card rounded-lg overflow-hidden border-2 ${
                  selectedImageIndex === index ? 'border-primary' : 'border-transparent'
                }`}
              >
                <img
                  src={image.url}
                  alt={`${producto.nombre} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">{producto.nombre}</h1>
          <p className="text-lg text-muted-foreground mb-4">{producto.descripcionCorta}</p>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-3xl font-bold text-primary">
              ${getCurrentPrice().toFixed(2)}
            </span>
            {producto.precioMinimo !== producto.precioMaximo && (
              <span className="text-lg text-muted-foreground">
                ${producto.precioMinimo} - ${producto.precioMaximo}
              </span>
            )}
          </div>

          {producto.categorias && producto.categorias.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {producto.categorias.map((categoria) => (
                <span
                  key={categoria._id}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  {categoria.nombre}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Variant Selection */}
        <div className="space-y-4">
          {/* Variante */}
          {availableVariantes.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Tipo: {selectedVariante?.variante || 'Seleccionar'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableVariantes.map((variante) => (
                  <button
                    key={variante._id}
                    onClick={() => {
                      setSelectedVariante(variante);
                      setSelectedCalidad(null);
                      setSelectedColor(null);
                      setSelectedTalla(null);
                    }}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedVariante?._id === variante._id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-primary'
                    }`}
                  >
                    {variante.variante || 'Estándar'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Calidad */}
          {availableCalidades.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Calidad: {selectedCalidad?.calidad || 'Seleccionar'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {availableCalidades.map((calidad) => (
                  <button
                    key={calidad._id}
                    onClick={() => {
                      setSelectedCalidad(calidad);
                      setSelectedColor(null);
                      setSelectedTalla(null);
                    }}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedCalidad?._id === calidad._id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-primary'
                    }`}
                  >
                    {calidad.calidad || 'Estándar'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color */}
          {availableColores.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Color: {selectedColor?.color || 'Seleccionar'}
              </label>
              <div className="flex flex-wrap gap-2">
                {availableColores.map((color) => (
                  <button
                    key={color._id}
                    onClick={() => {
                      setSelectedColor(color);
                      setSelectedTalla(null);
                    }}
                    className={`flex items-center gap-2 p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedColor?._id === color._id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-primary'
                    }`}
                  >
                    <div
                      className="w-4 h-4 rounded-full border"
                      style={{ backgroundColor: color.codigoHex }}
                    />
                    {color.color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Tallas */}
          {availableTallas.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Talla: {selectedTalla?.talla || selectedTalla?.codigo || 'Seleccionar'}
              </label>
              <div className="grid grid-cols-4 gap-2">
                {availableTallas.map((talla) => (
                  <button
                    key={talla._id}
                    onClick={() => setSelectedTalla(talla)}
                    className={`p-3 border rounded-lg text-sm font-medium transition-colors ${
                      selectedTalla?._id === talla._id
                        ? 'border-primary bg-primary text-primary-foreground'
                        : 'border-muted hover:border-primary'
                    }`}
                  >
                    {talla.talla || talla.codigo}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Stock Info */}
        {getAvailableStock() > 0 && (
          <div className="text-sm text-muted-foreground">
            Stock disponible: {getAvailableStock()} unidades
          </div>
        )}

        {/* Quantity and Actions */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <label className="text-sm font-medium text-foreground">Cantidad:</label>
            <div className="flex items-center border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 hover:bg-muted"
              >
                -
              </button>
              <span className="px-4 py-2 border-x">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(getAvailableStock(), quantity + 1))}
                className="px-3 py-2 hover:bg-muted"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              disabled={getAvailableStock() === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCartIcon className="w-5 h-5" />
              Agregar al Carrito
            </button>
            
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="p-3 border border-muted rounded-lg hover:bg-muted"
            >
              {isWishlisted ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Descripción</h3>
          <p className="text-muted-foreground whitespace-pre-line">{producto.descripcion}</p>
        </div>

        {/* Tags */}
        {producto.etiquetas && producto.etiquetas.length > 0 && (
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold text-foreground mb-3">Etiquetas</h3>
            <div className="flex flex-wrap gap-2">
              {producto.etiquetas.map((etiqueta, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm"
                >
                  #{etiqueta}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}