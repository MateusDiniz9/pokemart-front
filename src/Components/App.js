import GlobalStyle from "./globalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUp from "./SignUp";
import CartPage from "./cart/CartPage";
import CheckoutPage from "./checkout/CheckoutPage";
import UserContext from "../contexts/UserContext";
import CartContext from "../contexts/CartContext";

export default function App() {
  const [cart, setCart] = useState(null);
  const [user, setUser] = useState(null);

  return (
    <>
      <GlobalStyle />
      <UserContext.Provider value={{user, setUser}}>
      <CartContext.Provider value={{cart, setCart}}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/:saleId" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
      </UserContext.Provider>
      </CartContext.Provider>
  </>
  );
}
