import React, { useContext, useEffect, useState } from 'react';
import CartIcon from '../Cart/CartIcon';
import './card-button-module.css';
import { CartContext } from '../../store/Cart-context';

const CardButton = ({shownCartHandler}) => {

    const [showAnimation, setShowAnimation] = useState(false);
    //const { cartContext: { totalAmount } } = useContext(CartContext);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx.cartContext;

    const numberOfCartItems = cartCtx.cartContext.items.reduce( (curr, item) => {
        return curr + item.amount
    }, 0 );

    //const btnClasses = `${classses.button} ${classses.bump}`
    useEffect(() => {
        if(items.length === 0) return;
        setShowAnimation(true);

        const timer = setTimeout(() => {
            setShowAnimation(false)
        },300)

        return () => {
            clearTimeout(timer)
        }
    },[items])

    return(
        <>
            <button className={`button ${showAnimation ? 'bump' : ''}`} onClick={shownCartHandler} >
                <span className='icon'>
                    <CartIcon />
                </span>
                <span>Your Cart</span>
                <span className='badge'>{numberOfCartItems}</span>
            </button>
        </>
    )
}

export default CardButton;