import { Product } from "@/lib/interfaces"
import AddProductTemplate from "../components/AddProductTemplate"

const AddProductPage = () => {
  const product = {} as Product
  return (
    <AddProductTemplate producto={product} />
  )
}

export default AddProductPage