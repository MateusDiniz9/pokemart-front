import GlobalStyle from "./globalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import LogInPage from "./LogInPage";
import SignUp from "./SignUp";
import { useState } from "react";
import UserContext from "../contexts/UserContext";

export default function App() {
  const [cart, setCart] = useState([]);
  return (
    <>
      <GlobalStyle />
      <UserContext.Provider
        value={{
          cart,
          setCart,
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LogInPage />} />
            <Route path="/cadastro" element={<SignUp />}></Route>
          </Routes>
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}
