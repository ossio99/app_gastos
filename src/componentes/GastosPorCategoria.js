import React from 'react'
import { Header, Titulo } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../elementos/BtnRegresar'
import BarraTotalGastado from './BarraTotalGastado'

const GastosPorCategoria = () => {

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
			<BarraTotalGastado />
		</>
	)
}

export default GastosPorCategoria