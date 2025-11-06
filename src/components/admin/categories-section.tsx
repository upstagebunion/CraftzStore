'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { apiService } from '@/lib/api';

interface CategoriaDiseno {
  _id: string;
  nombre: string;
  descripcion?: string;
  activo: boolean;
  orden: number;
}

export function CategoriesSection() {
  const [categorias, setCategorias] = useState<CategoriaDiseno[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoriaDiseno | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    orden: 0
  });

  useEffect(() => {
    loadCategorias();
  }, []);

  const loadCategorias = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategoriasDisenos() as CategoriaDiseno[];
      setCategorias(response);
    } catch (error) {
      console.error('Error loading categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingCategory) {
        await apiService.updateCategoriaDiseno(editingCategory._id, formData);
      } else {
        await apiService.createCategoriaDiseno(formData);
      }
      
      setShowForm(false);
      setEditingCategory(null);
      setFormData({ nombre: '', descripcion: '', orden: 0 });
      loadCategorias();
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Error al guardar la categoría');
    }
  };

  const handleEdit = (categoria: CategoriaDiseno) => {
    setEditingCategory(categoria);
    setFormData({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion || '',
      orden: categoria.orden
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de eliminar esta categoría?')) {
      try {
        await apiService.deleteCategoriaDiseno(id);
        loadCategorias();
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Error al eliminar la categoría');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Cargando categorías...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-card-foreground">Categorías de Diseños</h2>
        <button
          onClick={() => {
            setEditingCategory(null);
            setFormData({ nombre: '', descripcion: '', orden: 0 });
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <PlusIcon className="w-5 h-5" />
          Nueva Categoría
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-card p-6 rounded-lg border">
          <h3 className="text-lg font-semibold mb-4">
            {editingCategory ? 'Editar Categoría' : 'Nueva Categoría'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Nombre *</label>
                <input
                  type="text"
                  required
                  className="w-full p-3 border rounded-lg bg-background"
                  value={formData.nombre}
                  onChange={(e) => setFormData(prev => ({ ...prev, nombre: e.target.value }))}
                  placeholder="Ej: Cultura Azteca"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Orden</label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg bg-background"
                  value={formData.orden}
                  onChange={(e) => setFormData(prev => ({ ...prev, orden: parseInt(e.target.value) || 0 }))}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Descripción</label>
              <textarea
                rows={3}
                className="w-full p-3 border rounded-lg bg-background"
                value={formData.descripcion}
                onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                placeholder="Descripción de la categoría..."
              />
            </div>
            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:bg-primary/90"
              >
                {editingCategory ? 'Actualizar' : 'Crear'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-muted text-muted-foreground px-6 py-2 rounded-lg hover:bg-muted/80"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Categories List */}
      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-4 font-medium">Nombre</th>
              <th className="text-left p-4 font-medium">Descripción</th>
              <th className="text-left p-4 font-medium">Orden</th>
              <th className="text-left p-4 font-medium">Estado</th>
              <th className="text-left p-4 font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria._id} className="border-b hover:bg-muted/50">
                <td className="p-4 font-medium">{categoria.nombre}</td>
                <td className="p-4 text-muted-foreground">{categoria.descripcion || '-'}</td>
                <td className="p-4">{categoria.orden}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    categoria.activo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {categoria.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(categoria)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(categoria._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}