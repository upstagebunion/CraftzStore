'use client';

import { useState, useRef } from 'react';
import { PhotoIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { uploadToCloudinary } from '@/lib/cloudinary';

interface ImageUploadProps {
  images: Array<{ url: string; esPrincipal: boolean; orden: number }>;
  onImagesChange: (images: Array<{ url: string; esPrincipal: boolean; orden: number }>) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    if (images.length + files.length > maxImages) {
      alert(`Máximo ${maxImages} imágenes permitidas`);
      return;
    }

    setUploading(true);
    try {
      const uploadPromises = files.map(file => uploadToCloudinary(file));
      const results = await Promise.all(uploadPromises);
      
      const newImages = results.map((result, index) => ({
        url: result.secure_url,
        esPrincipal: images.length === 0 && index === 0, // First image is principal if no images exist
        orden: images.length + index + 1
      }));

      onImagesChange([...images, ...newImages]);
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Error al subir las imágenes');
    } finally {
      setUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    // If we removed the principal image, make the first one principal
    if (images[index].esPrincipal && newImages.length > 0) {
      newImages[0].esPrincipal = true;
    }
    onImagesChange(newImages);
  };

  const setPrincipal = (index: number) => {
    const newImages = images.map((img, i) => ({
      ...img,
      esPrincipal: i === index
    }));
    // Reorder after setting principal
    newImages.forEach((img, i) => img.orden = i + 1);
    onImagesChange(newImages);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-card-foreground mb-2">
        Imágenes del Producto ({images.length}/{maxImages})
      </label>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <img
              src={image.url}
              alt={`Producto ${index + 1}`}
              className="w-full h-32 object-cover rounded-lg border"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setPrincipal(index)}
                className={`px-2 py-1 text-xs rounded ${
                  image.esPrincipal 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-white text-black hover:bg-yellow-500 hover:text-white'
                }`}
              >
                {image.esPrincipal ? 'Principal' : 'Hacer Principal'}
              </button>
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
        
        {images.length < maxImages && (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="h-32 border-2 border-dashed border-muted-foreground/30 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors disabled:opacity-50"
          >
            <PhotoIcon className="w-8 h-8 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {uploading ? 'Subiendo...' : 'Agregar Imagen'}
            </span>
          </button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <p className="text-xs text-muted-foreground">
        Formatos soportados: JPG, PNG, WebP. Máximo 10MB por imagen.
        La primera imagen será la principal por defecto.
      </p>
    </div>
  );
}