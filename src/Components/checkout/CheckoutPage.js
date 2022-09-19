import React from "react";
import styled from "styled-components";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../../commons/Loading";
import { getCheckout } from "../../services/pokemart";
import CheckoutProduct from "./CheckoutProduct";

function CheckoutPage() {
  const { saleId } = useParams();
  const currencyTransform = 100;
  const [ checkout, setCheckout ] = useState([]);
  const [ balance, setBalance ] = useState(0);
  const [ uniqueCheckoutProducts, setUniqueCheckoutProducts ] = useState([]);
  const [username] = useState(JSON.parse(localStorage.getItem("pokemart")).username);


  useEffect(() => {
    getCheckout(saleId)
        .then(res => setCheckout(res.data))
        .catch(erro => console.log(erro))
  }, [saleId]);

  useEffect(() => {
    let temp = 0;
    checkout.products?.forEach((data) => temp = temp + data.price);
    setBalance(temp);
  }, [checkout]);

  useEffect(() => {
    const uniqueProducts = [];
    const uniqueIds = [];
    checkout.products?.forEach(element => {
      if (!uniqueIds.includes(element.id)) {
        uniqueIds.push(element.id);
        uniqueProducts.push(element);
      }
    })
    setUniqueCheckoutProducts(uniqueProducts);
  }, [checkout]);

  return (
    <>
        <Main>
          <h1><span>{username}</span>, parabéns pela sua compra!</h1>
          <h2>{`O método de pagamento utilizado foi `} <span>{checkout.paymentMethod}</span></h2>
            <TotalBox>
                <p>Total da sua compra: R$ {balance/currencyTransform.toFixed(2)}</p>
            </TotalBox>
            <Box>
              {checkout && uniqueCheckoutProducts.length !== 0 ? uniqueCheckoutProducts.map((product, index) => <CheckoutProduct key={index} product={product} quantity={checkout.products.filter(element => product.name === element.name).length}/>) : <Loading />}
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
    margin-bottom: 48px;
  }
  h2 {
    font-weight: 400;
    font-size: 32px;
    color: #ffffff;
    margin-bottom: 24px;
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
    color: yellow;
  }
`;

const TotalBox = styled.div`
  background-color: #FFCB05;
  width: 100%;
  height: 80px;
  padding: 15px;
  font-size: 24px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px 5px 0 0;
`;

const Box = styled.div`
  background-color: #EDEDED;
  width: 100%;
  padding: 15px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  border-radius: 0 0 5px 5px;
`;
