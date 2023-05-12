import React from "react";
import { Helmet } from "react-helmet";
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from './elementos/Header'
import Boton from './elementos/Boton'
import BotonCerrarSesion from "./elementos/BotonCerrarSesion";

function App() {
	return (
		<div className="App">
			<>
				<Helmet>
					<title>Agregar gasto</title>
				</Helmet>
				<Header>
					<ContenedorHeader>
						<Titulo>Agregar gasto</Titulo>
						<ContenedorBotones>
							<Boton to='/categorias'>Categorías</Boton>
							<Boton to='/lista'>Lista de gastos</Boton>
							<BotonCerrarSesion />
						</ContenedorBotones>
					</ContenedorHeader>
				</Header>

			</>
		</div>
	);
}

export default App;
