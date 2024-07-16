import ProductoTemplate from "./producto.html"

export async function generateStaticParams() {
  return [{id:"1"}];  
}

const ProductoPage = ( { params } : { params: {id: number}}) => {
  return (
    <ProductoTemplate />
  )
}

export default ProductoPage