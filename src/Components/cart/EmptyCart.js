import React from "react"
import styled from "styled-components";
import { Link } from "react-router-dom";

export default function EmptyCart() {
    return(
        <>
            <ProductsBox>
                <p>Seu carrinho ainda está vazio, adicione alguns produtos!</p>
            </ProductsBox>

            <Link to="/">
                <h3>Volte e escolha alguns produtos!</h3>
            </Link>
        </>
    )
}

const ProductsBox = styled.div`
    width: 100%;
    min-height: 250px;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 5px;
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
`;