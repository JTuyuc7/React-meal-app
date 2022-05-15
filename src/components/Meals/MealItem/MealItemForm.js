import React, { useRef, useState } from 'react';
import './meal-item-form-module.css';
import Input from '../../UI/Input';

const MealItemForm = (props) => {
    const [ formValid, setFormIsValid ] = useState(true);
    const amountRef = useRef();

    const submitHandler = (e) => {
        e.preventDefault()

        const enteredAmount = amountRef.current.value;
        const enteredAmountRef = +enteredAmount;
        //console.log(enteredAmountRef, 'amount selected')
        if( enteredAmount.trim().length === 0 || enteredAmountRef < 1 || enteredAmountRef > 5 ){
            setFormIsValid(false)
            return;
        }

        props.onAddToCart(enteredAmountRef);
    }
    
    return(
        <>
            <form 
                className='form'
                onSubmit={submitHandler}
            >
                <Input 
                    ref={amountRef}
                    label='Amount' 
                    input={{
                        id: 'amount',
                        type: 'number',
                        min: '1',
                        max: '5',
                        step: '1',
                        defaultValue: '1'
                    }} 
                />

                <button
                    onClick={ () => console.log('Adding item') }
                >Add</button>
                {
                    !formValid && (
                        <p>Please enter a valid amount (1-5) </p>
                    )
                }
            </form>
        </>
    )
}

export default MealItemForm;