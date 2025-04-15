// Base product interface representing essential product information
export interface Product {
  id: string
  name: string
  image: string
  actualPrice: number
  originalPrice?: number
  freeShipping: boolean
  isNew: boolean
  discountPercentage?: number
  store: string
  brand: string
  addedDate: string
}

// Variation with image and stock info
export interface ProductVariation {
  name: string
  inStock: boolean
  image: string
}

// Extended product details interface
export interface ProductDetail extends Product {
  description: string
  variations: ProductVariation[]
  categoryIds: string[]
}

export interface Category {
  id: string
  name: string
}
