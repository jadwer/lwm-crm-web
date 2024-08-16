import { useBrands } from "@/hooks/brands";
import { Brand, Brands } from "@/lib/interfaces";
import { useEffect } from "react";

const SideBrands = (props : any) => {
  const brands : Brands = props.data.brands;
  const setBrands = props.functions.setBrands;
    const queryBrandsId = props.data.queryBrandsId
    const setQueryBrandsId = props.functions.setQueryBrandsId;
    const brandsQuery = props.functions.brandsQuery;
    
    const { getBrands } = useBrands();
    useEffect(() => {
      getBrands({setBrands});
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    useEffect(() => {
      if (Object.keys(brands).length !== 0) {
        setQueryBrandsId(Array(brands.data.length).fill(-1));
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [brands]);
  
    const handleOnChange = (toggleBrand : number, id : number) => {
      const updatedSelectedBrands = queryBrandsId.map((marca : number, index: number) =>
        index === toggleBrand ? marca !== -1 ? -1 : id : marca
      );
      setQueryBrandsId(updatedSelectedBrands);
      brandsQuery(updatedSelectedBrands);
    }
    
    if(Object.keys(brands).length === 0){
            return <>Cargando...</>;
    }else{
          return (
              <div className="col-12 col-md-2 sidebar-products">
              <h5>MARCAS</h5>
              {Object.keys(brands).length !== 0 &&
                brands.data.map((marca, index) => {
                  return (
                    <div className="form-check" key={marca.id}>
                      <input
                        id={`marca${marca.id}`}
                        type="checkbox"
                        className="form-check-input"
                        checked={queryBrandsId[index] !== -1 ? true : false}
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