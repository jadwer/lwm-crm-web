'use client'
import ProductoTemplate from "./producto.html";

const ProductoPage = ({params} : {params : { id : number}}) => {
  const {id} = params;
  return (
    <ProductoTemplate data={{id}}/>
  )
}

export default ProductoPage
