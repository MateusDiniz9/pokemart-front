import React from "react";
import styled from "styled-components";

export default function CartProduct({ product }) {
    console.log(product)
    return (
        <>
            <Container>
                <div>
                    <TransactionDescription>{product.name}</TransactionDescription>
                </div>
                <div>
                    <TransactionValue>{ }</TransactionValue>
                </div>
            </Container>
        </>
    )
}

const Container = styled.div`
    font-weight: 400;
    font-size: 16px;
    gap: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const TransactionDescription = styled.span`
    color: #000000;
`;

const TransactionValue = styled.span`
    color: #000000;
`;