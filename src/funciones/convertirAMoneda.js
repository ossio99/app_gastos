import React from 'react'

const formatearCantidad = (cantidad) => {
  return (
    Intl.NumberFormat('en-US', {
        //tipo de formato
        style: 'currency',
        //tipo de moneda 
        currency: 'USD', 
        minimumFractionDigits: 2}).format(cantidad)
  )
}

export default formatearCantidad;