import { useBrands } from "@/hooks/brands";
import { Brand, Brands } from "@/lib/interfaces";
import { useEffect } from "react";

const SideBrands = (props : any) => {
    const setSelectedBrands = props.functions.setSelectedBrands;
    const setBrands = props.functions.setBrands;
    const brands : Brands = props.data.brands;
    const selectedBrands : boolean[] = props.data.selectedBrands;
    const queryBrands = props.data.queryBrands;
    const setQueryBrandsId = props.functions.setQueryBrandsId;
    const queryBrandsId = props.data.queryBrandsId

    const { getBrands } = useBrands();
    useEffect(() => {
      getBrands({setBrands});

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
      if (Object.keys(brands).length !== 0) {
        let selectedMarcas: boolean[] = [];
        let selectedMarcasId : number[] = [];
        brands.data.map((marca, index) => {
          if(queryBrands){
            if(queryBrands.includes(marca.name)){
              selectedMarcas[index] =  true;
              selectedMarcasId.push(marca.id);
            } else {
              selectedMarcas[index] =  false;
            }
          } else {
            selectedMarcas = [];
          }
        });
        setSelectedBrands(selectedMarcas);
        setQueryBrandsId(selectedMarcasId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brands]);
  
    const handleOnChange = (toggleBrand : number, id : number) => {
      const updatedSelectedBrands = selectedBrands.map((marca, index) =>
        index === toggleBrand ? !marca : marca
      );
      setSelectedBrands(updatedSelectedBrands);

      let qbId = queryBrandsId;
      if(queryBrandsId.includes(id)){
        qbId = qbId.filter((qid : number)=> qid !== id);
      } else {
        qbId.push(id);
      }
        
      setQueryBrandsId(qbId);
    }
    
    if(Object.keys(brands).length === 0){
            return <>Cargando...</>;
    }else{
          return (
              <div className="col-12 col-md-2">
              <h5>MARCAS</h5>
              {selectedBrands && Object.keys(brands).length !== 0 &&
                brands.data.map((marca, index) => {
                  return (
                    <div className="form-check" key={marca.id}>
                      <input
                        id={`marca${marca.id}`}
                        type="checkbox"
                        className="form-check-input"
                        checked={selectedBrands[index]? selectedBrands[index] : false}
                        onChange={(e) => handleOnChange(index, marca.id)}
                        value={marca.id}
                      />
      
                      <label htmlFor="marca1" className="form-check-label">
                        {marca.name}
                      </label>
                    </div>
                  );
                })}
            </div>
      
          );
      }
    
}; export default SideBrands;