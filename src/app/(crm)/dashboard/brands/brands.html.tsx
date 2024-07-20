const BrandsTemplate = () => (

    <main>
        <div className="container-fluid back-header">
            <div className="row my-4 align-items-md-center">
                <div className="col-12 col-md-6">
                    <h2>Marcas</h2>
                    <h4>Agregar Marca</h4>
                </div>
                <div className="col-12 col-md-6 d-flex justify-content-end">
                    <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        Agregar
                    </button>
                </div>
            </div>
        </div>
        <div className="container-fluid container-product">
            <div className="row">
                <div className="col-12 mt-2 table-product">
                    <table className="table">
                        <thead>
                            <tr>
                                <th className="tab-name" scope="col">Nombre de la marca</th>
                                <th className="tab-actions" scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">Nombre de la marca</th>
                                <td>Editar | Eliminar</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" /*tabindex="-1" */ aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="staticBackdropLabel">Agregar / Editar</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div>
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" id="name" placeholder="Nombre de la marca"></input>
                            <label className="form-label">Descripción</label>
                            <input type="text" className="form-control" id="descript" placeholder="Nombre de la marca"></input>
                            <label className="form-label">Slug</label>
                            <input type="text" className="form-control" id="slug" placeholder="Nombre de la marca"></input>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar</button>
                    </div>
                </div>
            </div>
        </div>
    </main>

); export default BrandsTemplate;