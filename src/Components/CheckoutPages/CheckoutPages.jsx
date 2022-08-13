import React from 'react'
import BtnCheckOut from './BtnCheckOut'

const CheckoutPages = ( { setCompra , amount}) => {

    const currency= 'MXN'


  return (
    <div>
        <h1>Comprar</h1>
        <BtnCheckOut 
        currency={currency}
        showSpinner={false}
        amount={amount}
        setCompra={setCompra}
        />
    </div>
  )
}

export default CheckoutPages