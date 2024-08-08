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
        <div className="row products-list">
          {productos.data.map((producto: Product) => {
            return (
                <div className="col-12" key={producto.id}>
                  <p>
                    <span className="labels">
                      Marca: {producto.brand_id.name} | Categoría: {producto.category_id.name}
                    </span>
                  </p>
                  <h6>
                    {producto.name}
                  </h6>
                  <a href={`producto/${producto.id}`}>VER DETALLE</a>
                  <hr></hr>
                </div>
            );
          })}
          <div className="col-12 text-center btn-space">
            <a className="btn btn-primary" href="productos" role="button">
              Ver todos los productos
            </a>
          </div>
        </div>
      </div>
    );
  }
};

export default Recommended;
