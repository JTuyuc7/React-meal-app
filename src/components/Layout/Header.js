import React from 'react';
import './header-module.css'
import bgImage from '../../assets/meals.jpg';
import HeaderCardButtom from './HeaderCardButton';

const Header = ( {shownCartHandler}) => {

    return(
        <>
            <div>
                <header
                    className='header'
                >
                    <h1>React Meals</h1>

                    <HeaderCardButtom shownCartHandler={shownCartHandler} />
                </header>

                <div
                    className='main-image'
                >
                    <img 
                        src={bgImage}
                        alt='Meals'
                    />
                </div>
            </div>
        </>
    )
}

export default Header;