import React from 'react';
import reactDom from 'react-dom';
import './modal-module.css';

const Backdrop = ({hideCartHandler}) => {

    return(
        <div className='backdrop' onClick={hideCartHandler} />
    )
};

const ModalOverlay = (props) => {
    return(
        <div className='modal'>
            <div className='content'>
                {props.children}
            </div>
        </div>
    )
};

const portalElement = document.getElementById('overlays')

const Modal = (props) => {

    return(

        <>  
            {reactDom.createPortal(<Backdrop hideCartHandler={props.hideCartHandler} />, portalElement)}
            {reactDom.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElement)}
        </>
    )
}

export default Modal;