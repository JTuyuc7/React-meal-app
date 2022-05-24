import React, { useReducer } from 'react';
import { CartContext } from './Cart-context';

const defatulCartState = {
    items: [],
    totalAmount: 0,
};

const cartReducer = (state, action) => {

    if(action.type === 'ADD_ITEM_TO_CART'){
        const updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
        
        const existingCartItemIndex = state.items.findIndex( (item) => item.id === action.payload.id );
        const existingCartItem = state.items[existingCartItemIndex];
        
        let updatedItems;
        if(existingCartItem){
            
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            }
            
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }else {
            updatedItems = state.items.concat(action.payload);
        }

        
        return {
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'REMOVE_ITEM'){
        const existingCartItemIndex = state.items.findIndex( (ele) => ele.id === action.payload );
        const existingItem = state.items[existingCartItemIndex];
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;

        if(existingItem.amount === 1){
            updatedItems = state.items.filter( (item) => item.id !== action.payload )
        }else {
            const updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
            updatedItems = [...state.items]
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        return{
            ...state,
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }

    if(action.type === 'CLEAR'){
        return{
            ...state,
            items: [],
            totalAmount: 0
        }
    }

    return defatulCartState;

    /* switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            return{
                ...state,
                items: [...state.items, ...action.payload]
            }
        case 'REMOVE_ITEM':
            return{
                ...state,

            }
        default:
            return defatulCartState;
    } */
}

export const CartProvider = ({children}) => {

    const [state, dispatchAction] = useReducer(cartReducer, defatulCartState);

    const addItemToCarHandler = (item) => {
        dispatchAction({ type: 'ADD_ITEM_TO_CART', payload: item })
    }

    const removeItemFromCartHandler = (id) => {
        dispatchAction({ type: 'REMOVE_ITEM', payload: id })
    }

    const clearCartHandler = () => {
        dispatchAction({ type: 'CLEAR'})
    }

    const cartContext = {
        items: state.items,
        totalAmount: state.totalAmount,
        addItem: addItemToCarHandler,
        removeItem: removeItemFromCartHandler,
        clearCartHandler: clearCartHandler,
    }

    return(
        <CartContext.Provider
            value={{
                cartContext
            }}
        >
            {children}
        </CartContext.Provider>
    )
}