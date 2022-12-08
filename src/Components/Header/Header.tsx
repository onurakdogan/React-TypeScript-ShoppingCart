import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
 
import {
    myTheme,
    theme,
    myCart
} from "../../features/product/ProductSlice"

import style from "./styles.module.scss"

export default function Header() {
    const mydarkMode = useAppSelector(myTheme);
    const dispatch = useAppDispatch();

    return (
        <div className={style.headerWrapper}>
          <div className={style.itemWrapper}>  
            <div><Link to="/">Home</Link></div>
            <div><Link to="/basket">Basket</Link></div>
            <div><Link to="/favorites">Favorites</Link></div>
            <div>
              <label className={style.switch}>
                <input onChange={() => dispatch(theme(!mydarkMode))} type="checkbox"/>
                <span className={style.slider+" "+style.round}></span>
              </label>
            </div>
          </div>
        </div>
    );
}