import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart';
import { CartProvider } from '../src/store/Cart-Provider';

const App = () => {

  const [ cartShown, setCartShown ] = useState(false);

  const shownCartHandler = () => {
    setCartShown(true)
  };

  const hideCartHandler = () => {
    setCartShown(false)
  }

  return(

    <>
      <CartProvider>
        <Header  shownCartHandler={shownCartHandler}   />
        { cartShown && ( <Cart hideCartHandler={hideCartHandler} /> )}
        <main>
          <Meals />
        </main>
      </CartProvider>
    </>
  )
}

export default App;