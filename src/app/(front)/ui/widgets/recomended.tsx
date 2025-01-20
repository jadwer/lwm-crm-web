"use client";
import { useProducts } from "@/hooks/products";
import { Product, Products } from "@/lib/interfaces";
import { useEffect, useState } from "react";

const Recommended = () => {
  const [productos, setProductos] = useState<Products>({} as Products);
  const { getFilteredProducts } = useProducts();


  useEffect(() => {
    getFilteredProducts({ setProductos }, "?sort=created_at");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  if (Object.keys(productos).length === 0) {
    return <>Cargando...</>;
  } else {
    return (
      <div className="container products">
        <div className="row">
          <div className="col text-center">
            <h1>ÚLTIMOS PRODUCTOS</h1>
            <hr className="separator"></hr>
          </div>
        </div>
        <div className="container products filtered">
        <div className="row ">
          {productos.data.map((producto: Product) => {
              const showPrice = producto.price
              ? producto.price !== 0.00
                ? true
                : false
              : false;
            
            return (
                <div className="col-12 col-md-4 card-products" key={producto.id}>
                  <img src={
                process.env.NEXT_PUBLIC_BACKEND_URL +
                "/storage/products/" +
                producto.img_path
              } className="img-fluid" alt="Labor Wasser México" />
                  <div className="product-card-inner">
                  <p>
                    <span className="labels">
                      Marca: {producto.brand_id.name} | Categoría: {producto.category_id.name}
                    </span>
                  </p>
                  <h6>
                    {producto.name}
                  </h6>
                  {showPrice && <h5>${producto.price ? producto.price.toFixed(2) : "0.00"}</h5>}
                  <a href={`producto/${producto.id}`}>VER DETALLE</a>
                  </div>
                </div>
            );
          })}
          <div className="col-12 text-center btn-space">
            <a className="btn btn-primary" href="productos/todos" role="button">
              Ver todos los productos
            </a>
          </div>
        </div>
        </div>
      </div>
    );
  }
};

export default Recommended;
