import React from "react";
import { useState, useContext } from "react";
import styled from "styled-components";
import { GrFormTrash, GrFormAdd, GrFormSubtract } from 'react-icons/gr';
import { changeProductQuantity, deleteProduct } from "../../services/pokemart";
import CartContext from "../../contexts/CartContext";

export default function CartProduct({ product, quantity }) {
    const [localData] = useState(JSON.parse(localStorage.getItem('pokemart')))
    const { setCart } = useContext(CartContext);

    function changeQuantity(boolean) {
        const operation = {
            id: product.id,
            add: boolean
        }
        if (localData?.token) {
            changeProductQuantity(operation)
                .then(res => setCart(res.data))
                .catch(erro => console.log(erro))
        } else {
            console.log('localstorage')
        }
    }

    function removeProduct() {
        if (localData?.token) {
            deleteProduct(product.id)
                .then(res => setCart(res.data))
                .catch(erro => console.log(erro))
        } else {
            console.log('localstorage')
        }
    }

    return (
        <>
            <Container>
                <ProductBox>
                    <img src={product.img} alt={`${product.name} img`}/>
                    <p>{product.name.charAt(0).toUpperCase()+product.name.slice(1)}</p>
                </ProductBox>
                <ControllersBox>
                    <div>
                        <GrFormTrash onClick={removeProduct}/>
                    </div>
                    <div>
                        <GrFormAdd onClick={() => changeQuantity(true)}/>
                        <p>{quantity}</p>
                        <GrFormSubtract onClick={() => changeQuantity(false)}/>
                    </div>
                </ControllersBox>
            </Container>
        </>
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
    justify-content: space-between;
    font-size: 24px;

    div {
        display: flex;
        align-items: center;
    }
`;