import React, { useContext, useEffect, useState } from 'react'
import useObtenerGastosDelMes from '../hooks/useObtenerGastosDelMes';

const TotalGastadoContext = React.createContext();

const useTotalDelMes = () => useContext(TotalGastadoContext);

const TotalGastadoProvider = ({children}) => {
    const [total, cambiarTotal] = useState(0);
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        let sumaGastos = 0;
        gastos.forEach((gasto) => {
            sumaGastos += gasto.cantidad;
        })
        cambiarTotal(sumaGastos);
    }, [gastos]);

    return (
        <TotalGastadoContext.Provider value={{total}} >
            {children}
        </TotalGastadoContext.Provider>
    );
}

export {TotalGastadoProvider, useTotalDelMes}