import React from "react";
import styled from "styled-components";

export default function CartProduct({ product, quantity }) {
    console.log(product, quantity)
    return (
        <>
            <Container>
                <ProductBox>
                    <img src={product.img} alt={`${product.name} img`}/>
                    <Product>{product.name.charAt(0).toUpperCase()+product.name.slice(1)}</Product>
                </ProductBox>
                <ControllersBox>
                    +
                    <span>{quantity}</span>
                    -
                </ControllersBox>
            </Container>
        </>
    )
}

const Container = styled.div`
    font-size: 16px;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: green;
`;

const ProductBox = styled.div`
    gap: 5px;
    display: flex;
    align-items: center;
    background-color: orange;

    img {
        width: 80px;
    }
`;

const ControllersBox = styled.div`
    gap: 5px;
    display: flex;
    align-items: center;
    background-color: yellow;
`;

const Product = styled.span`
    font-weight: 700;
    color: #000000;
`;