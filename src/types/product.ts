export interface Talla {
  _id: string
  SUK?: string
  codigo: string
  talla?: string
  stock: number
  costo: number
  orden: number
  disponibleOnline: boolean
}

export interface Color {
  _id: string
  color: string
  codigoHex: string
  disponibleOnline: boolean
  tallas?: Talla[]
  SUK?: string
  stock?: number
  costo?: number
  orden: number
}

export interface Calidad {
  _id: string
  calidad?: string
  disponibleOnline: boolean
  colores: Color[]
  orden: number
}

export interface Variante {
  _id: string
  variante?: string
  disponibleOnline: boolean
  calidades: Calidad[]
  orden: number
}

export interface ProductoBase {
  _id: string
  nombre: string
  descripcion: string
  categoria: { _id: string; nombre: string }
  subcategoria: { _id: string; nombre: string; usaTallas: boolean }
  configVariantes: {
    usaVariante: boolean
    usaCalidad: boolean
  }
  variantes: Variante[]
  imagenes: Array<{
    url: string
    esPrincipal: boolean
    orden: number
  }>
  activo: boolean
}

export interface ProductoOnline {
  _id: string
  slug: string
  nombre: string
  descripcionCorta?: string
  descripcion: string
  precioMinimo: number
  precioMaximo: number
  diseno: string
  imagenes: Array<{
    url: string
    esPrincipal: boolean
    orden: number
  }>
  productoBase: ProductoBase
  varianteSugerida: {
    corte: string
    calidad: string
    color: string
    talla?: string
  }
  configColor: {
    colorFijo: boolean
    colorRequerido?: string
  }
  categorias: Array<{ _id: string; nombre: string }>
  etiquetas: string[]
  activo: boolean
  destacado: boolean
  fechaCreacion: string
  fechaActualizacion: string
}

export interface Categoria {
  _id: string
  nombre: string
  subcategorias?: Array<{
    _id: string
    nombre: string
    usaTallas: boolean
  }>
}

// Legacy interface for compatibility
export interface Product {
  id: string
  name: string
  description: string
  price: number
  currency: 'MXN'
  images: string[]
  category: string
  sizes?: string[]
  colors?: string[]
}