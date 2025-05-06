import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import productsJson from './products.json'
import type { Product, ProductDetail } from '@/types/product.ts'
import deliveryCosts from './deliveryCosts.json'

const mock = new MockAdapter(axios, { delayResponse: 1000 })

// Extract product and categories
const { products, categories } = productsJson

// Map categories for easy access
const categoriesMap = new Map(categories.map(cat => [cat.id, cat.name]))

// Add category name to products
const enrichWithCategoryNames = (product: any) => ({
  ...product,
  categories: product.categoryIds?.map((id: string) => categoriesMap.get(id)) || []
})

// Cast JSON
const productDetails = products.map(enrichWithCategoryNames) as ProductDetail[]
const productList: Product[] = productDetails.map(
  ({ id, name, image, actualPrice, originalPrice, freeShipping, isNew, discountPercentage, store, brand, description, variations, categoryIds, addedDate }) => ({
    id,
    name,
    image,
    actualPrice,
    originalPrice,
    freeShipping,
    isNew,
    discountPercentage,
    store,
    brand,
    description,
    variations,
    categoryIds,
    addedDate
  })
)

// Categories endpoint
mock.onGet('/categories').reply(200, categories)

// Product list endpoint
mock.onGet('/products/published/web').reply(200, productList)

// Product details endpoint
mock.onGet(/\/products\/[^/]+\/details/).reply(config => {
  const id = config.url?.match(/\/products\/(\d+)\/details/)?.[1]
  const detail = productDetails.find(p => String(p.id) === id)
  return detail ? [200, detail] : [404]
})

// Related products endpoint
mock.onGet(/\/products\/\d+\/related/).reply(config => {
  const id = config.url?.match(/\/products\/(\d+)\/related/)?.[1]
  const currentProduct = productDetails.find(p => p.id === id)
  
  if (!currentProduct) return [404]
  
  // Obtain products of the same category
  const relatedProducts = productList.filter(product => 
    product.id !== id && 
    product.categoryIds?.some(catId => 
      currentProduct.categoryIds?.includes(catId)
    )
  ).slice(0, 10) // Limit to 10 products
  
  return [200, relatedProducts]
})

// Add locations endpoint
mock.onGet('/delivery-locations').reply(200, deliveryCosts.location)

export default mock