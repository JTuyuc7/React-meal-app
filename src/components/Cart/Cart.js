import React, { useContext, useState } from 'react';
import './cart-module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { CartContext } from '../../store/Cart-context';
import Checkout from './Checkout';

const Cart = ( {hideCartHandler}) => {
    const [ showCheckout, setShownCheckot ] = useState(false);
    const [ submitting, setSubmitting ] = useState(false);
    const [ didSubmit, setDidSubmit ] = useState(false);
    const { cartContext } = useContext(CartContext);
    const totalPrice = `${cartContext.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = (id) => {
        //console.log(id, 'desde el modal cart?')
        cartContext.removeItem(id);
    }

    const cartItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
    }

    const orderHandler = () => {
        setShownCheckot( (prevState) => !prevState)
    }

    const submitOrderHandler = async (userData) => {
        //console.log(userData, 'from the cart component')
        setSubmitting(true);
        const result = await fetch('string para ordenes', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                oderedItems: cartContext.items
            }),
            
        });
        setSubmitting(false);
        setDidSubmit(true);
        cartContext.clearCartHandler()
    }

    const carItems = <ul className='cart-items'>{cartContext.items.map( (ele) => {
        return(
            <CartItem 
                key={ele.id} 
                name={ele.name} 
                amount={ele.amount} 
                price={ele.price}   
                onRemove={cartItemRemoveHandler.bind(null, ele.id)}
                onAdd={cartItemHandler.bind(null, ele)}
            />
        )
    } )}</ul>;
    
    const modalActions = <div className='actions'>
        <button 
            type='button'
            className='button--alt'
            onClick={hideCartHandler}
        >Close</button>
        {
            cartContext.items.length > 0 && (
                <button 
                    className='button'
                    onClick={orderHandler}
                >Order</button>
            )
        }
        
    </div>

    const cartModalContent = (
        <>
            {carItems} 
                <div className='total'>
                    <span>Total Amount</span>
                    <span>{totalPrice}</span>
                </div>
                <div
                    
                >
                    {
                        showCheckout && <Checkout onCancel={hideCartHandler} submitOrderHandler={submitOrderHandler} />
                    }
                    {
                        !showCheckout && modalActions
                    }
                </div>
        </>
    )

    const isSubmittingModalContent = <p>Sending you order...</p>
    const didSubmitModalContet = (
        <>
            <div className='actions'>
                <p>Great, order created!</p>
                <button 
                    type='button'
                    className='button--alt'
                    onClick={hideCartHandler}
                >Close</button>
            </div>
        </>
    );

    return(
        <>
            <Modal hideCartHandler={hideCartHandler}>
                { !submitting && !didSubmit && cartModalContent}
                { submitting && isSubmittingModalContent}
                { !submitting && didSubmit && didSubmitModalContet }
            </Modal>
        </>
    )
}

export default Cart;