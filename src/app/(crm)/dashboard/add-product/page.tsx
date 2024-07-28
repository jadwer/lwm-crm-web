import { Product } from "@/lib/interfaces"
import AddProductTemplate from "./addProduct.html"

const AddProductPage = () => {
  const product = {} as Product
  return (
    <AddProductTemplate producto={product} />
  )
}

export default AddProductPage