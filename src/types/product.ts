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
}

// Extended product details interface
export interface ProductDetail extends Product {
  brand: string
  description: string
  variations: {
    name: string
    inStock: boolean
  }[]
}