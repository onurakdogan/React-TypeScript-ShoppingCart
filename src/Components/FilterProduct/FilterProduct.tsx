import {  
  priceFilter,
  ratingFilter} from "../../features/product/ProductSlice";
import {useAppDispatch} from "../../app/hooks";

export default function FilterProducts() {
 
    const dispatch = useAppDispatch();

    return (
        <>
          <select defaultValue={'default'} onChange={(e) => dispatch(priceFilter(e.target.value))}>
            <option value="default" disabled>Please Select Price</option>
            <option value="lowToHigh">Low To High</option>
            <option value="highToLow">High To Low</option>
          </select>

          <select defaultValue={'default'} onChange={(e) => dispatch(ratingFilter(e.target.value))}>
            <option value="default" disabled>Please Select Rating</option>
            <option value="lowToHigh">Low To High</option>
            <option value="highToLow">High To Low</option>
          </select>
        </>
    );
}