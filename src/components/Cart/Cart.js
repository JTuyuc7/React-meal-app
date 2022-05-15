import React, { useContext } from 'react';
import './cart-module.css';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import { CartContext } from '../../store/Cart-context';

const Cart = ( {hideCartHandler}) => {
    const { cartContext } = useContext(CartContext);
    const totalPrice = `${cartContext.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = (id) => {
        //console.log(id, 'desde el modal cart?')
        cartContext.removeItem(id);
    }

    const cartItemHandler = (item) => {
        cartContext.addItem({...item, amount: 1})
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

    return(
        <>
            <Modal hideCartHandler={hideCartHandler}>
                {carItems} 
                

                <div className='total'>
                    <span>Total Amount</span>
                    <span>{totalPrice}</span>
                </div>

                <div className='actions'>
                    <button 
                        type='button'
                        className='button--alt'
                        onClick={hideCartHandler}
                    >Close</button>
                    {
                        cartContext.items.length > 0 && (
                            <button 
                                className='button'
                                onClick={ () => console.log('Ordenando?')}
                            >Order</button>
                        )
                    }
                </div>
            </Modal>
        </>
    )
}

export default Cart;