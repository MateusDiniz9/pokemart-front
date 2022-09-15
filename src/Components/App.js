import GlobalStyle from "./globalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUp from "./SignUp";
import CartPage from "./cart/CartPage";
import CheckoutPage from "./checkout/CheckoutPage";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/cadastro" element={<SignUp />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout/:saleId" element={<CheckoutPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
