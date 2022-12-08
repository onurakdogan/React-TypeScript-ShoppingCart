import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {  
  myFavorites,
  deleteProduct,
  addFavorite,
  modal,
  openModal,
  selectedItem
} from "../../features/product/ProductSlice";

import style from "./styles.module.scss";
  
function Modal() {
    
    const[existItem,setExistItem] = useState<boolean>(false);
     
    const selectedItems = useAppSelector(selectedItem);
    const openModals = useAppSelector(openModal);
    const favorites = useAppSelector(myFavorites);
 
    const dispatch = useAppDispatch();
    
    useEffect(()=>{
          setExistItem(favorites.find((item: any) => item.id === selectedItems.id))
    },[selectedItems])
    
    return (
        
        <div> 
        <div className={style.modalOverlay}>
            <div className={style.modal}>
                <button
                className={style.closeButton}
                onClick={()=>{dispatch(modal({"modalVal":!openModals}))}}
                />

                Ürünü sepetten kaldırmak istediğinize emin misiniz ?
                <div className={style.contentWrapper}>
                <button onClick={() => { 
                    dispatch(deleteProduct(selectedItems.id));
                    dispatch(modal({"modalVal":!openModals,"item":selectedItems}));
                    }}
                    >Ürünü sepetten çıkar
                </button>

                {!existItem  && 
                <button 
                onClick={() => {
                dispatch(deleteProduct(selectedItems.id)); 
                dispatch(addFavorite(selectedItems));
                dispatch(modal({"modalVal":!openModals,"item":selectedItems}));
                }}
                >
                Ürünü sepetten çıkar ve favorilere ekle
                </button>
                }
                </div>
            </div>
        </div>
</div>
    );
}

export default Modal;