import React, { useRef, useState } from 'react';
import './checkout-module.css';

const isEmpty = value => value.trim() === '';
const isFiveChar = value => value.trim().length !== 5;

const Checkout = ({onCancel, submitOrderHandler}) => {
    const [ formInputsValidity, setFormInputsValidity ] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    });

    const name = useRef();
    const street = useRef();
    const postal = useRef();
    const city = useRef();
    const submitHandler = (e) => {
        e.preventDefault()

        //Validation of fields
        const enteredName = name.current.value;
        const enteredStreet = street.current.value;
        const enteredPostal = postal.current.value;
        const enteredCity = city.current.value;

        const nameIsValid = !isEmpty(enteredName);
        const streetIsValid = !isEmpty(enteredStreet);
        const postalIsValid = !isFiveChar(enteredPostal);
        const cityIsValid = !isEmpty(enteredCity);

        setFormInputsValidity({
            name: nameIsValid,
            street: streetIsValid,
            postalCode: postalIsValid,
            city: cityIsValid
        })

        const formIsValid = nameIsValid && streetIsValid && postalIsValid && cityIsValid;

        if(!formIsValid){
            // Submit the form all valid are true
            return;
        }

        submitOrderHandler({
            name: enteredName,
            street: enteredStreet,
            postalCode: enteredPostal,
            city: enteredCity
        })
    }

    return(
        <>
                <form
                    onSubmit={submitHandler}
                    className='form'
                >
                    <div className={`control ${formInputsValidity.name ? '' : 'invalid'}`}>
                        <label htmlFor='name'>Your Name</label>
                        <input 
                            type='text'
                            placeholder='Your name'
                            id='name'
                            name='name'
                            ref={name}
                        />
                        { !formInputsValidity.name && (<p>Please enter a valid name</p>)}
                    </div>
                    <div className={`control ${formInputsValidity.street ? '' : 'invalid'}`}>
                        <label htmlFor='street'>Street</label>
                        <input 
                            type='text'
                            placeholder='Your street'
                            id='street'
                            name='street'
                            ref={street}
                        />
                        { !formInputsValidity.street && (<p>Please enter a valid street</p>)}
                    </div>
                    <div className={`control ${formInputsValidity.postalCode ? '' : 'invalid'}`}>
                        <label htmlFor='postalCode'>Postal Code</label>
                        <input 
                            type='text'
                            placeholder='Your postalCode'
                            id='postalCode'
                            name='postalCode'
                            ref={postal}
                        />
                        {!formInputsValidity.postalCode && (<p>Please enter a valid postal code</p>)}
                    </div>
                    <div className={`control ${formInputsValidity.city ? '' : 'invalid'}`}>
                        <label htmlFor='city'>City</label>
                        <input 
                            type='text'
                            placeholder='Your city'
                            id='city'
                            name='city'
                            ref={city}
                        />
                        { !formInputsValidity.city && (<p>Please enter valid city</p>)}
                    </div>
                    <div
                        className='actions'
                    >
                        <button
                            onClick={onCancel}
                            type='button'
                        >Cancel</button>
                        <button
                            className='submit'
                            type="submit"
                        >Confirm order</button>
                    </div>
                </form>
        </>
    )
}

export default Checkout;