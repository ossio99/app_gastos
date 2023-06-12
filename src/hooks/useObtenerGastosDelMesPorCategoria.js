import { useEffect, useState } from 'react'
import useObtenerGastosDelMes from './useObtenerGastosDelMes';

const useObtenerGastosDelMesPorCategoria = () => {
    const [gastosPorCategoria, cambiarGastosPorCategoria] = useState();
    const gastos = useObtenerGastosDelMes();

    useEffect(() => {
        //nos va a devolver en este caso un objeto con la suma de cada categoria
        //esta funcion se va a ejecutar por cada elemento de gastos
        const sumaDeGastos = gastos.reduce((objetoResultante, objetoActual) => {
            const categoriaActual = objetoActual.categoria;
            const cantidadActual = objetoActual.cantidad;

            //sintaxis para acceder a una propiedad de un objeto de manera dinamica
            //o sea que lo que esta dentro de los corchetes sera el valor del objeto final el que coincida con la propiedad que extrajimos del objeto actual
            objetoResultante[categoriaActual] += cantidadActual;

            // se devuelve objetoResultante en cada iteración, esto asegura que el objeto acumulador se actualice en cada iteración y se pase al siguiente elemento del array
            return objetoResultante;
        }, {
            //a este objeto le vamos a sumar los valores
            'comida': 0,
            'cuentas y pagos': 0,
            'hogar': 0,
            'transporte': 0,
            'ropa': 0,
            'salud e higiene': 0,
            'compras': 0,
            'diversion': 0,
        });

        //Object.keys() devuelve un arreglo con las keys de un objeto
        cambiarGastosPorCategoria(Object.keys(sumaDeGastos).map((elemento) => {
            return { categoria: elemento, cantidad: sumaDeGastos[elemento] }
        }));
    }, [gastos])

    return gastosPorCategoria;
}

export default useObtenerGastosDelMesPorCategoria;