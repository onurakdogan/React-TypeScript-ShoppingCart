import Header from '../Header/Header';
import {
  myFavorites,
  addCart
} from "../../features/product/ProductSlice";
import { useAppSelector, useAppDispatch } from "../../app/hooks";

import style from "../../features/product/styles.module.scss";

export default function Favorites() {
    const favorites = useAppSelector(myFavorites);
    const dispatch = useAppDispatch();

    return (
        <div>
            <Header/> 
            <div className={style.productWrapper}>
                    {
                    favorites.map((item: any, index: any) => (
                        <div className={style.product} key={index}>
                        <img src={item.image} className={style.productImg}></img>
                        <p>{item.title.substr(0, 20)}</p>
                        <p>{item.price.toFixed(2)}$</p>
                        <p>Rate : {item.rating.rate}</p>
                        <button onClick={() => dispatch(addCart(item))}>Add Cart</button>
                        </div>
                    ))
                    }
            </div>
        </div>
    );
}
 