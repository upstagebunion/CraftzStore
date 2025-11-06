'use client';

import { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { apiService } from '@/lib/api';
import { ProductoBase, Variante, Calidad, Color } from '@/types/product';

interface CreateProductModalProps {
  productosBase: ProductoBase[];
  onClose: () => void;
  onProductCreated: () => void;
}

interface CategoriaDiseno {
  _id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
}

export function CreateProductModal({ productosBase, onClose, onProductCreated }: CreateProductModalProps) {
  const [loading, setLoading] = useState(false);
  const [categorias, setCategorias] = useState<CategoriaDiseno[]>([]);
  const [selectedProductoBase, setSelectedProductoBase] = useState<ProductoBase | null>(null);
  const [selectedVariante, setSelectedVariante] = useState<Variante | null>(null);
  const [selectedCalidad, setSelectedCalidad] = useState<Calidad | null>(null);
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  
  const [formData, setFormData] = useState({
    slug: '',
    nombre: '',
    descripcionCorta: '',
    descripcion: '',
    diseno: '',
    etiquetas: '',
    destacado: false,
    colorFijo: true,
    colorRequerido: '',
    categorias: [] as string[]
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      const response = await apiService.getCategoriasDisenos() as CategoriaDiseno[];
      setCategorias(response || []);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleProductoBaseChange = (productoBaseId: string) => {
    const producto = productosBase.find(p => p._id === productoBaseId);
    setSelectedProductoBase(producto || null);
    setSelectedVariante(null);
    setSelectedCalidad(null);
    setSelectedColor(null);
  };

  const handleVarianteChange = (varianteId: string) => {
    const variante = selectedProductoBase?.variantes.find(v => v._id === varianteId);
    setSelectedVariante(variante || null);
    setSelectedCalidad(null);
    setSelectedColor(null);
  };

  const handleCalidadChange = (calidadId: string) => {
    const calidad = selectedVariante?.calidades.find(c => c._id === calidadId);
    setSelectedCalidad(calidad || null);
    setSelectedColor(null);
  };

  const handleColorChange = (colorId: string) => {
    const color = selectedCalidad?.colores.find(c => c._id === colorId);
    setSelectedColor(color || null);
    if (color) {
      setFormData(prev => ({ ...prev, colorRequerido: color.color }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductoBase || !selectedVariante || !selectedCalidad || !selectedColor) {
      alert('Por favor selecciona todas las variantes requeridas');
      return;
    }

    setLoading(true);
    try {
      await apiService.crearProductoOnline({
        productoBase: selectedProductoBase._id,
        slug: formData.slug,
        nombre: formData.nombre,
        descripcionCorta: formData.descripcionCorta,
        descripcion: formData.descripcion,
        diseno: formData.diseno,
        varianteSugerida: {
          corte: selectedVariante._id,
          calidad: selectedCalidad._id,
          color: selectedColor._id,
        },
        configColor: {
          colorFijo: formData.colorFijo,
          colorRequerido: formData.colorRequerido
        },
        categorias: formData.categorias,
        etiquetas: formData.etiquetas.split(',').map(tag => tag.trim()).filter(Boolean),
        destacado: formData.destacado
      });

      onProductCreated();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-card-foreground">Crear Producto Online</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Producto Base */}
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Producto Base *
            </label>
            <select
              required
              className="w-full p-3 border rounded-lg bg-background text-foreground"
              onChange={(e) => handleProductoBaseChange(e.target.value)}
            >
              <option value="">Seleccionar producto base</option>
              {productosBase.map((producto) => {
                console.log('Producto:', producto);
                return (
                  <option key={producto._id} value={producto._id}>
                    {producto?.nombre || 'Sin nombre'} - {producto?.categoria?.nombre || 'Sin categoría'}
                  </option>
                );
              })}
            </select>
          </div>

          {/* Variantes */}
          {selectedProductoBase && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Variante *
                </label>
                <select
                  required
                  className="w-full p-3 border rounded-lg bg-background text-foreground"
                  onChange={(e) => handleVarianteChange(e.target.value)}
                >
                  <option value="">Seleccionar</option>
                  {selectedProductoBase.variantes
                    ?.filter(v => v.disponibleOnline)
                    .map((variante) => (
                      <option key={variante._id} value={variante._id}>
                        {variante?.variante || 'Estándar'}
                      </option>
                    )) || []}
                </select>
              </div>

              {selectedVariante && (
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Calidad *
                  </label>
                  <select
                    required
                    className="w-full p-3 border rounded-lg bg-background text-foreground"
                    onChange={(e) => handleCalidadChange(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {selectedVariante.calidades
                      ?.filter(c => c.disponibleOnline)
                      .map((calidad) => (
                        <option key={calidad._id} value={calidad._id}>
                          {calidad?.calidad || 'Estándar'}
                        </option>
                      )) || []}
                  </select>
                </div>
              )}

              {selectedCalidad && (
                <div>
                  <label className="block text-sm font-medium text-card-foreground mb-2">
                    Color *
                  </label>
                  <select
                    required
                    className="w-full p-3 border rounded-lg bg-background text-foreground"
                    onChange={(e) => handleColorChange(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    {selectedCalidad.colores
                      ?.filter(c => c.disponibleOnline)
                      .map((color) => (
                        <option key={color._id} value={color._id}>
                          {color?.color || 'Sin color'}
                        </option>
                      )) || []}
                  </select>
                </div>
              )}
            </div>
          )}

          {/* Información del producto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Slug (URL) *
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg bg-background text-foreground"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="playera-guerrero-azteca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Nombre del Producto *
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg bg-background text-foreground"
                value={formData.nombre}
                onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                placeholder="Playera Diseño 'Guerrero Azteca'"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Descripción Corta
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-background text-foreground"
              value={formData.descripcionCorta}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcionCorta: e.target.value }))}
              placeholder="Descripción breve que aparece en la lista de productos"
              maxLength={200}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Descripción Completa *
            </label>
            <textarea
              required
              rows={4}
              className="w-full p-3 border rounded-lg bg-background text-foreground"
              value={formData.descripcion}
              onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
              placeholder="Descripción detallada del producto..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Diseño *
              </label>
              <input
                type="text"
                required
                className="w-full p-3 border rounded-lg bg-background text-foreground"
                value={formData.diseno}
                onChange={(e) => setFormData(prev => ({ ...prev, diseno: e.target.value }))}
                placeholder="Guerrero Azteca"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-card-foreground mb-2">
                Etiquetas (separadas por comas)
              </label>
              <input
                type="text"
                className="w-full p-3 border rounded-lg bg-background text-foreground"
                value={formData.etiquetas}
                onChange={(e) => setFormData(prev => ({ ...prev, etiquetas: e.target.value }))}
                placeholder="azteca, cultura, diseño"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Categorías de Diseño
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto border rounded-lg p-3 bg-background">
              {categorias?.map((categoria) => (
                <label key={categoria._id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={formData.categorias.includes(categoria._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          categorias: [...prev.categorias, categoria._id]
                        }));
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          categorias: prev.categorias.filter(id => id !== categoria._id)
                        }));
                      }
                    }}
                    className="rounded"
                  />
                  <span className="text-card-foreground">{categoria.nombre}</span>
                </label>
              )) || (
                <div className="col-span-full text-center text-muted-foreground py-4">
                  {categorias.length === 0 ? 'No hay categorías disponibles' : 'Cargando categorías...'}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.destacado}
                onChange={(e) => setFormData(prev => ({ ...prev, destacado: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm text-card-foreground">Producto destacado</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.colorFijo}
                onChange={(e) => setFormData(prev => ({ ...prev, colorFijo: e.target.checked }))}
                className="rounded"
              />
              <span className="text-sm text-card-foreground">Color fijo</span>
            </label>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-muted-foreground hover:text-foreground"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50"
            >
              {loading ? 'Creando...' : 'Crear Producto'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}