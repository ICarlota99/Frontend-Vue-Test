import MockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import productsJson from './products.json'
import type { Product, ProductDetail } from '@/types/product.ts'

const mock = new MockAdapter(axios, { delayResponse: 1000 })

// Cast JSON as array of ProductDetail with optional fields
const productDetails = productsJson as ProductDetail[]
const productList: Product[] = productDetails.map(
  ({ id, name, image, actualPrice, originalPrice, freeShipping, isNew, discountPercentage, store, brand, description, variations }) => ({
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
    variations
  })
)

// List endpoint
mock.onGet('/products/published/web').reply(200, productList)

// Details endpoint
mock.onGet(/\/products\/\d+\/details/).reply(config => {
  const id = config.url?.match(/\/products\/(\d+)\/details/)?.[1]
  const detail = productDetails.find(p => p.id === id)
  return detail ? [200, detail] : [404]
})

export default mock
