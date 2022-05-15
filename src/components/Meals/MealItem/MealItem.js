import React, { useContext } from 'react';
import './meal-item-module.css';
import MealItemForm from './MealItemForm';
import { CartContext } from '../../../store/Cart-context';

const MealItem = ({meal}) => {

    const { cartContext: { addItem }} = useContext(CartContext)
    const price = `${meal.price.toFixed(2)}`;

    const onAddToCart = (amount) => {
        addItem({
            id: meal.id,
            name: meal.name,
            amount: amount,
            price: meal.price
        })
    }

    return(
        <>
            <li className='meal'>
                <div>
                    <h3>{meal.name}</h3>
                    <div className='description'>
                        {meal.description}
                    </div>
                    <div className='price'>{price}</div>
                </div>

                <div>
                    <MealItemForm onAddToCart={ (amount) => onAddToCart(amount)} />
                </div>
            </li>
        </>
    )
}

export default MealItem;