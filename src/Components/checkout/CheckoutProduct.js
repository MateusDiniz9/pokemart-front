import React from "react";
import styled from "styled-components";

export default function CheckoutProduct({ product, quantity }) {
    const currencyTransform = 100;

    return(
        <Container>
            <ProductBox>
                <p>{quantity} x</p>
                <img src={product.img} alt={`${product.name} img`}/>
                <p>{product.name.charAt(0).toUpperCase()+product.name.slice(1)}</p>
            </ProductBox>
            <ControllersBox>
                <p>R$ {product.price/currencyTransform}/un</p>
                <p>Total R$ {product.price*quantity/currencyTransform}</p>
            </ControllersBox>
        </Container>
    )
}

const Container = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 2px 2px 2px 2px #11296B;
    border-radius: 5px;
`;



const ProductBox = styled.div`
    gap: 5px;
    display: flex;
    align-items: center;
    font-size: 24px;
    font-weight: 700;
    img {
        height: 80px;
    }
`;

const ControllersBox = styled.div`
    height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: space-around;
    font-size: 24px;
`;