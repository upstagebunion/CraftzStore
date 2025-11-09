'use client';

import { useState, useEffect } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { apiService } from '@/lib/api';
import { ProductoOnline, ProductoBase } from '@/types/product';
import { CreateProductModal } from '@/components/admin/create-product-modal';
import { CategoriesSection } from '@/components/admin/categories-section';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminPage() {
  const [productos, setProductos] = useState<ProductoOnline[]>([]);
  const [productosBase, setProductosBase] = useState<ProductoBase[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'products' | 'categories'>('products');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Test connection first
      const isConnected = await apiService.testConnection();
      if (!isConnected) {
        throw new Error('No se puede conectar al backend.');
      }
      
      const [productosResponse, productosBaseResponse] = await Promise.all([
        apiService.getProductos({ limit: 50 }) as Promise<{ productos: ProductoOnline[] }>,
        apiService.getProductosBase() as Promise<ProductoBase[]>
      ]);
      
      setProductos(productosResponse.productos);
      setProductosBase(productosBaseResponse);
    } catch (err) {
      console.error('Error loading data:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Error desconocido'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = () => {
    setShowCreateModal(false);
    loadData();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute requireAdmin={true}>
      <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Administración de Tienda</h1>
            <p className="text-muted-foreground mt-2">
              Gestiona productos y categorías de la tienda online
            </p>
          </div>
          {activeTab === 'products' && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Crear Producto Online
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-8">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'products'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Productos
          </button>
          <button
            onClick={() => setActiveTab('categories')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTab === 'categories'
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            Categorías
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === 'products' && (
          <>
            {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Productos Online</h3>
            <p className="text-3xl font-bold text-primary">{productos.length}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Productos Base</h3>
            <p className="text-3xl font-bold text-primary">{productosBase.length}</p>
          </div>
          <div className="bg-card p-6 rounded-lg border">
            <h3 className="text-lg font-semibold text-card-foreground mb-2">Destacados</h3>
            <p className="text-3xl font-bold text-primary">
              {productos.filter(p => p.destacado).length}
            </p>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-card rounded-lg border overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold text-card-foreground">Productos Online</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left p-4 font-medium text-muted-foreground">Producto</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Diseño</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Precio</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Estado</th>
                  <th className="text-left p-4 font-medium text-muted-foreground">Producto Base</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((producto) => (
                  <tr key={producto._id} className="border-b hover:bg-muted/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={producto.imagenes?.find(img => img.esPrincipal)?.url || 
                               producto.imagenes?.[0]?.url || 
                               producto.productoBase?.imagenes?.find(img => img.esPrincipal)?.url ||
                               producto.productoBase?.imagenes?.[0]?.url ||
                               'https://res.cloudinary.com/craftzstorage/image/upload/v1751499155/Shirt_Front_3D_72_ppp4_gaunmu.jpg'}
                          alt={producto.nombre}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-card-foreground">{producto.nombre}</p>
                          <p className="text-sm text-muted-foreground">/{producto.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-card-foreground">{producto.diseno}</td>
                    <td className="p-4 text-card-foreground">
                      ${producto.precioMinimo} - ${producto.precioMaximo}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${producto.activo ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <span className="text-sm text-card-foreground">
                          {producto.activo ? 'Activo' : 'Inactivo'}
                        </span>
                        {producto.destacado && (
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                            Destacado
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-card-foreground">{producto.productoBase?.nombre || 'Sin producto base'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

          </>
        )}

        {activeTab === 'categories' && (
          <CategoriesSection />
        )}

        {/* Create Product Modal */}
        {showCreateModal && (
          <CreateProductModal
            productosBase={productosBase}
            onClose={() => setShowCreateModal(false)}
            onProductCreated={handleProductCreated}
          />
        )}
        </div>
      </div>
    </ProtectedRoute>
  );
}