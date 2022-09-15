import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../commons/Loading";
import { getCheckout } from "../../services/pokemart";
//import header
import CheckoutProduct from "./CheckoutProduct";

function CheckoutPage() {
  const { saleId } = useParams();
  const [checkout, setCheckout] = useState([]);

  useEffect(() => {
    getCheckout(saleId)
        .then(res => setCheckout(res.data))
        .catch(erro => console.log(erro))
  }, [saleId]);

  if(checkout && checkout.length !== 0) {
    console.log(checkout)
  }

  return (
    <>
        {/* <Header /> */}
        <Main>
          <h1>Parabéns pela sua compra!</h1>
          <h2>{`O método de pagamento utilizado foi ${checkout.paymentMethod}`}</h2>
            <Box>
                {checkout && checkout.length !== 0 ? checkout.products.map((product, index) => <CheckoutProduct key={index} product={product[0]}/>) : <Loading />}
            </Box>
            <Link to="/">
            <h3>Quer voltar e dar uma olhadinha em outros produtos?</h3>
            </Link>
        </Main>
    </>
  );
}

export default CheckoutPage;

const Main = styled.div`
  background-color: purple;
  min-height: 100vh;
  margin: auto;
  padding: 5%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    font-weight: 400;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 24px;
  }
  h3 {
    font-weight: 700;
    font-size: 15px;
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
`;

const Box = styled.div`
  background-color:red;
  min-height: 300px;
  width: 90%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  div {
    background-color: green;
    padding: 5px;
  }
`;