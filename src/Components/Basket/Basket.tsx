import Header from '../Header/Header';
import {  
  myCart,
  increment,
  decrement,
  modal,
  openModal
} from "../../features/product/ProductSlice";

import { useAppSelector, useAppDispatch } from "../../app/hooks";
import Modal from '../Modal/Modal';
import style from "../../features/product/styles.module.scss";

function Basket() {
    const cart = useAppSelector(myCart);
    const openModals = useAppSelector(openModal);
    const dispatch = useAppDispatch();
    return (
        <div>
            <Header />
            {openModals &&
                <Modal/>
            }

            <div className={style.infoWrapper}>
                TotalPrice : {cart.reduce((acc:any, item:any) => acc + item.qty * item.price, 0).toFixed(2)}$
                <br></br>
                TotalProduct : ( {cart.reduce((acc:any, item:any) => acc + item.qty , 0)} )
            </div>

            <div className={style.productWrapper}>
                {
                cart.map((item: any, index: any) => (
                    <div className={style.product} key={index}>
                    <img src={item.image} className={style.productImg}></img>
                    <p>{item.title.substr(0, 20)}</p>
                    <p>{item.price.toFixed(2)}$</p>
                    <p>Rate : {item.rating.rate}</p>
                    <button onClick={() => dispatch(decrement(item))}>-</button>
                    <button onClick={() => dispatch(increment(item))}>+</button>
                    <button onClick={()=>{dispatch(modal({"modalVal":!openModals,"item":item}))}}>Delete</button>
                    </div>
                ))
                }
            </div>

        </div>
    );
}

export default Basket;
