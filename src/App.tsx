import { Product } from './features/product/Product';
import style from './index.module.scss';
import { HashRouter as MainRoute, Routes, Route } from "react-router-dom";
import Basket from './Components/Basket/Basket';
import Favorites from './Components/Favorites/Favorites';
import {myTheme} from "./features/product/ProductSlice";
import { useAppSelector } from "../src/app/hooks";

function App() {
  const darkMode = useAppSelector(myTheme); 
  return (
    <div className={style.app} data-dark={darkMode}>
      <MainRoute>
        <Routes>
          <Route path="/" element={<Product />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </MainRoute>
    </div>
  );
}
export default App;
