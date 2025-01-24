"use client";
import Link from "next/link";
import SelectCategories from "@/app/(crm)/ui/dropdownItems/selectCategories";
import SelectBrands from "@/app/(crm)/ui/dropdownItems/selectBrands";
import SelectUnits from "@/app/(crm)/ui/dropdownItems/selectUnits";
import { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import Image from "next/image";
import { useProducts } from "@/hooks/products";
import { Product } from "@/lib/interfaces";
import { useRouter } from "next/navigation";

const EditProductTemplate = (props: { producto: Product }) => {
  const producto = props.producto == null ? ({} as Product) : props.producto;
  const { setProduct } = useProducts();
  const [selectedImage, setSelectedImage] = useState<string>();
  const [nombre, setNombre] = useState<string>(producto.name);
  const [sku, setSku] = useState<string>(producto.sku);
  const [cost, setCost] = useState<string>(producto.cost ? producto.cost.toString() : "");
  const [price, setPrice] = useState<string>(producto.price ? producto.price.toString() : "");
  const [descripcion, setDescripcion] = useState<string>(producto.description? producto.description : "");
  const [descripcionTecnica, setDescripcionTecnica] = useState<string>(producto.full_description? producto.full_description : "");
  const [categoria, setCategoria] = useState<number>(producto.category_id.id);
  const [marca, setMarca] = useState<number>(producto.brand_id.id);
  const [unidad, setUnidad] = useState<number>(producto.unit_id.id);
  const [image_path, setImage_path] = useState<File>();
  const [datasheet, setDatasheet] = useState<File>();
  const [errors, setErrors] = useState<any[]>([]);
  const [status, setStatus] = useState<string>();
  const router = useRouter();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const submitNewProduct = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    let dataForm = {
      id: producto.id,
      name: nombre,
      sku: sku,
      description: descripcion  != "" ? descripcion : nombre,
      full_description: descripcionTecnica != "" ? descripcionTecnica : nombre,
      cost: cost,
      price: price,
      img_path: image_path?.name,
      datasheet_path: datasheet?.name,
      unit_id: unidad,
      category_id: categoria,
      brand_id: marca,
      selectedImage: image_path,
      datasheet: datasheet,
    };

    await setProduct({ setErrors, setStatus }, dataForm);
    setTimeout(() => {
      router.push('/dashboard/products');
    }, 5000);
  };

  const handleDecimalValidation = (isBlured: boolean, number: string, stateSetter : Dispatch<SetStateAction<string>>) => {
    let newNumber = number
    const validatedDecimals = number.split('.')
    if(validatedDecimals[0] !== "" && validatedDecimals[1] === undefined){
      validatedDecimals[1] = "00"
      newNumber = validatedDecimals[0] + "." + validatedDecimals[1]
    }
    if(validatedDecimals[0] !== "" && validatedDecimals[1].length === 1){
      validatedDecimals[1] = validatedDecimals[1]+"0"
      newNumber = validatedDecimals[0] + "." + validatedDecimals[1]
    }
    if(validatedDecimals[0] !== "" && validatedDecimals[1].length >= 3){
      validatedDecimals[1] = validatedDecimals[1].substring(0,2)
      newNumber = validatedDecimals[0] + "." + validatedDecimals[1]
    }
    
    stateSetter(newNumber)
    setIsFocused(false)
  }

  const handleSubmit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    submitNewProduct(e);
  };
 console.log(image_path)
  return (
    <main>
      <div className="container-fluid back-header">
        <div className="row my-4 align-items-md-center">
          <div className="col-12 col-md-6">
            <h2>Productos</h2>
            <h4>Agregar nuevo producto</h4>
          </div>
        </div>
      </div>
      <div className="container-fluid container-product">
        <form className="row g-3">
          <div className="col-12 col-md-4">
            <div id="imageContainer">Imagen del producto</div>
            <input
              type="file"
              id="fileInput"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                setImage_path(file ? file : undefined);
                setSelectedImage(file ? URL.createObjectURL(file) : undefined);
              }}
            />
            {selectedImage && (
              <Image
                src={selectedImage}
                width={300}
                height={300}
                alt={"Imagen del producto"}
                className="img-fluid"></Image>
            )}
            {!selectedImage && producto.img_path && (
              <img
              src={process.env.NEXT_PUBLIC_BACKEND_URL+"/storage/products/"+producto.img_path}
              width={300}
              height={300}
              alt={"Imagen del producto"}
              className="img-fluid"></img>

            )
            }
            <label>Seleccionar Imagen</label>
          </div>
          <div className="col-12 col-md-8">
            <div className="row">
              <div className="col-md-12">
                <label className="form-label">Nombre del producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  placeholder="Nombre del producto"
                  value={nombre}
                  onChange={(e) => {
                    setNombre(e.target.value);
                  }}></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">Id del producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="sku"
                  placeholder="sku"
                  value={sku}
                  onChange={(e) => {
                    setSku(e.target.value);
                  }}></input>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Marca del producto
                  <SelectBrands
                    stateData={{ marca, setMarca }}
                    label="Seleccione una marca"
                  />
                </label>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Unidad de medida del producto
                  <SelectUnits
                    stateData={{ unidad, setUnidad }}
                    label="Seleccione un medida"
                  />
                </label>
              </div>
              <div className="col-md-6">
                <label className="form-label">
                  Categoría del producto
                  <SelectCategories
                    stateData={{ categoria, setCategoria }}
                    label="Seleccione una categoría"
                  />
                </label>
              </div>
              <div className="col-md-12">
                <label className="form-label">
                  Descripción corta del producto
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="descripción corta del producto"
                  placeholder="Descripción corta del producto"
                  value={descripcion}
                  onChange={(e) => {
                    setDescripcion(e.target.value);
                  }}></input>
              </div>

              <div className="col-md-6">
                <label className="form-label">Costo del producto</label>
                <input
                  type="text"
                  className="form-control"
                  id="cost"
                  placeholder="Costo"
                  value={cost}
                  onChange={(e) => {
                    setCost(e.target.value)
                  }}
                  onBlur={() => handleDecimalValidation(true, cost, setCost)}
                  ></input>
              </div>
              <div className="col-6">
                <label className="form-label">
                  Precio
                  <input
                  type="text"
                  className="form-control"
                  id="price"
                  placeholder="Precio de venta"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value)
                  }}
                  onBlur={() => handleDecimalValidation(true, price, setPrice)}                                    
                  ></input>
                </label>
              </div>

              <div className="col-md-12">
                <label className="form-label">Datasheet:&nbsp;</label>
                <input
                  type="file"
                  id="fileInput"
                  accept="application/pdf"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    setDatasheet(file ? file : undefined);
                  }}
                />
                <div className="d-grid gap-2">
                  <a
                    href={process.env.NEXT_PUBLIC_BACKEND_URL +`/storage/datasheets/${producto.datasheet_path}`}
                    download={process.env.NEXT_PUBLIC_BACKEND_URL +`/storage/datasheets/${producto.datasheet_path}`}
                    target="_blank">
                    <button type="button" className="btn btn-secondary mt-1">
                      <span>DESCARGAR FICHA TÉCNICA</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12">
            <label className="form-label">
              Descripción técnica o larga del producto
            </label>
            <textarea
              className="form-control"
              id="descTec"
              placeholder="Descripción técnica o larga del producto"
              value={descripcionTecnica}
              onChange={(e) => {
                setDescripcionTecnica(e.target.value);
              }}></textarea>
            <br></br>
            <Link
              href="/dashboard/products"
              className="btn btn-secondary mt-2 me-4">
              Cancelar
            </Link>
            <button
              type="button"
              className="btn btn-primary mt-2"
              onClick={(e) => {
                handleSubmit(e);
              }}>
              Guardar
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};
export default EditProductTemplate;
