import React from 'react'
import { Header, Titulo } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import BtnRegresar from '../elementos/BtnRegresar'
// import BarraTotalGastado from './BarraTotalGastado'
import FormularioGasto from './FormularioGasto'
import { useParams } from 'react-router-dom'
import useObtenerGasto from '../hooks/useObtenerGasto'

const EditarGasto = () => {
	const {id} = useParams();
	const [gasto] = useObtenerGasto(id);
	// console.log(gasto);

	return (
		<>
			<Helmet>
				<title>Editar gasto</title>
			</Helmet>
			<Header>
				<BtnRegresar ruta='/lista' />
				<Titulo>Editar gasto</Titulo>
			</Header>
			<FormularioGasto gasto={gasto} />
			{/* aqui deberia ir BarraTotalGastado */}
		</>
	)
}

export default EditarGasto