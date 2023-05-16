import React from 'react'
import { Header, Titulo } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria'
import { ListaDeCategorias, ElementoListaCategorias, Categoria, Valor } from '../elementos/ElementosDeLista'
import IconoCategoria from '../elementos/IconoCategoria'
import formatearCantidad from '../funciones/convertirAMoneda'

const GastosPorCategoria = () => {


	let gastosPorCategoria = useObtenerGastosDelMesPorCategoria();

	return (
		<>
			<Helmet>
				<title>Gastos por categoría</title>
			</Helmet>
			<Header>
				<BtnRegresar />
				<Titulo>
					Gastos por categoria
				</Titulo>
			</Header>
			<ListaDeCategorias>
				{gastosPorCategoria && gastosPorCategoria.map((categoria, index) => {
					return (
						<ElementoListaCategorias key={index}>
							<Categoria>
								<IconoCategoria id={categoria.categoria} />
								{categoria.categoria}
							</Categoria>
							<Valor>{formatearCantidad(categoria.cantidad)}</Valor>
						</ElementoListaCategorias>
					);
				})}
			</ListaDeCategorias>
			<BarraTotalGastado />
		</>
	)
}

export default GastosPorCategoria