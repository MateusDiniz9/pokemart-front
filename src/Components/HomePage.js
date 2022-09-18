import styled from "styled-components";
import Header from "../commons/Header";
import { useState, useEffect } from "react";
import { getProducts } from "../services/pokemart";
import Loading from '../commons/Loading';

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <Wraper>
      <Header />
      <Products>
        {products.length === 0
          ? <Loading />
          : products.map((product, index) => (
              <Pokemon key={index}>
                <img src={product.img} alt="img_poke" />
                <h3>{product.name}</h3>
                <h3>R$ {product.price / 100}</h3>
                <h3>À vista no PIX</h3>
                <div>
                  <ion-icon name="cart"></ion-icon>Comprar
                </div>
              </Pokemon>
            ))}
      </Products>
    </Wraper>
  );
}

const Wraper = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #00509d;
`;

const Products = styled.div`
  margin-top: 150px;
  width: 90%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const Pokemon = styled.div`
  width: 170px;
  height: 170px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #11296b;
  border: 1px solid black;
  color: white;
  img {
    width: 90px;
    height: 90px;
    margin: 0 auto;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    width: 140px;
    height: 20px;
    background-color: #ffcb05;
  }
`;
