import { useEffect} from 'react';
import { BASE_URL } from '../../api';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  getData,
  selectCount,
  statusCount,
  addFavorite,
  addCart,
  myFilter
} from './ProductSlice';

import Header from '../../Components/Header/Header';
import Search from '../../Components/Search/Search';
import FilterProducts from '../../Components/FilterProduct/FilterProduct';
 

import style from "./styles.module.scss";
 
export function Product() {

  const products = useAppSelector(selectCount);
  const status = useAppSelector(statusCount);
  const filteredItems = useAppSelector(myFilter);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getData(BASE_URL));
  }, [])

  return (
    <>
     
      <Header />
      <div className={style.filterWrapper}>
      <Search/>
      <FilterProducts/>
      </div>
 
      <div className={style.productWrapper}>
        {status === true &&
          filteredItems.length === 0 ?
          products.map((item: any, index: any) => (
            <div className={style.product} key={index}>
              <img src={item.image} className={style.productImg}></img>
              <p>{item.title.substr(0, 20)}</p>
              <p>{item.price.toFixed(2)}$</p>
              <p>Rate : {item.rating.rate}</p>
              <button onClick={() => dispatch(addCart(item))}>Add Cart</button>
              <button onClick={() => dispatch(addFavorite(item))}>Add Favorite</button>
            </div>
          ))
          :
           filteredItems.map((item: any, index: any) => (
            <div className={style.product} key={index}>
              <img src={item.image} className={style.productImg}></img>
              <p>{item.title.substr(0, 20)}</p>
              <p>{item.price.toFixed(2)}$</p>
              <p>Rate : {item.rating.rate}</p>
              <button onClick={() => dispatch(addCart(item))}>Add Cart</button>
              <button onClick={() => dispatch(addFavorite(item))}>Add Favorite</button>
            </div>
          ))
           
        }
      </div>
 
 
      <div>

      </div>
    </>
  );
}
