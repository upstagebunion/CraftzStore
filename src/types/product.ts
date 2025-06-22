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