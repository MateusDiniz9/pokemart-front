import React from "react";
import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import { getCart } from "../../services/pokemart";
//import header
import CartContext from "../../contexts/CartContext";
import EmptyCart from "./EmptyCart";
import FullCart from "./FullCart";

function CartPage() {
    const { cart, setCart } = useContext(CartContext);
    const [localData] = useState(JSON.parse(localStorage.getItem('pokemart')));

  useEffect(() => {
    if (localData?.token) {
        getCart()
          .then(res => setCart(res.data))
          .catch(erro => console.log(erro))
    } else {
        setCart(localData?.cart);
    }
  }, [setCart, localData]);

  return (
    <>
        {/* <Header /> */}
        <Main>
          <h1>{localData?.token ? `${<span>{localData.username}</span>},` : 'Visitante,' } esse é seu carrinho:</h1>
          
          {cart && cart.length !== 0 ? <FullCart/> : <EmptyCart/>}

          
        </Main>
    </>
  );
}

export default CartPage;

const Main = styled.div`
  background-color: #11296B;
  min-height: 100vh;
  margin: auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 700;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 24px;
}
  h2 {
      font-weight: 700;
      font-size: 24px;
      color: #ffffff;
      margin-bottom: 5px;
  }
  h3 {
    font-weight: 400;
    font-size: 16px;
    color: #ffffff;
    margin-top: 36px;
    text-align: center;
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
    &:disabled {
      opacity: 0.8;
      cursor: default;
    }
  }
  span {
    color: #FFCB05;
  }
  form {
    width: 100%;
  }
`;