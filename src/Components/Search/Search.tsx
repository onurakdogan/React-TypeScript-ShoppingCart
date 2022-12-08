import {  
  productFilter
  } from "../../features/product/ProductSlice";
import {useAppDispatch } from "../../app/hooks";

export default function Search() {
    const dispatch = useAppDispatch();
    return (
        <>
            <input placeholder='Search' onChange={(e) => dispatch(productFilter(e.target.value))} />
        </>
    );
}
 