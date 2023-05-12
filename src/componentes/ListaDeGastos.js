import React from 'react'
import { Header, Titulo } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../elementos/BtnRegresar'

const ListaDeGastos = () => {
	return (
		<>
			<Helmet>
				<title>Lista de gastos</title>
			</Helmet>
			<Header>
				<BtnRegresar />
				<Titulo>
					Lista de gastos
				</Titulo>
			</Header>
		</>
	)
}

export default ListaDeGastos