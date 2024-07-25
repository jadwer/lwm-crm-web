import Link from "next/link";
import SelectCategories from "@/app/(crm)/ui/dropdownItems/selectCategories";
import SelectBrands from "../../ui/dropdownItems/selectBrands";
import SelectUnits from "../../ui/dropdownItems/selectUnits";

const AddProductTemplate = () => (
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
          <div id="imageContainer">Aquí va la imagen</div>
          <input type="file" id="fileInput" accept="image/*"></input>
          <label>Seleccionar Imagen</label>
        </div>
        <div className="col-12 col-md-8">
          <div className="row">
            <div className="col-md-12">
              <label className="form-label">Nombre del producto</label>
              <input
                type="text"
                className="form-control"
                id="nombre del producto"
                placeholder="Nombre del producto"></input>
            </div>
            <div className="col-md-6">
              <label className="form-label">Id del producto</label>
              <input
                type="text"
                className="form-control"
                id="id del producto"
                placeholder="Id del producto"></input>
            </div>
            <div className="col-6">
              <SelectBrands></SelectBrands>
            </div>
            <div className="col-6">
              <SelectUnits></SelectUnits>
            </div>
            <div className="col-6">
              <SelectCategories></SelectCategories>
            </div>
            <div className="col-md-12">
              <label className="form-label">
                Descripción corta del producto
              </label>
              <input
                type="text"
                className="form-control"
                id="descripción corta del producto"
                placeholder="Descripción corta del producto"></input>
            </div>
          </div>
        </div>
        <div className="col-12">
          <label className="form-label">
            Descripción técnica o larga del producto
          </label>
          <textarea
            className="form-control"
            id="Descripcion larga o técnica del producto"
            /*rows="3"*/ placeholder="Descripción técnica o larga del producto"></textarea>
          <br></br>
          <Link
            href="/dashboard/products"
            className="btn btn-secondary mt-2 me-4">
            Cancelar
          </Link>
          <button type="submit" className="btn btn-primary mt-2">
            Guardar
          </button>
        </div>
      </form>
    </div>
  </main>
);
export default AddProductTemplate;
