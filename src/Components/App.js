import GlobalStyle from "./globalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SignUp from "./SignUp";

export default function App() {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/cadastro" element={<SignUp />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
