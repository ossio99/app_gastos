import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import WebFont from 'webfontloader';
import Contenedor from './elementos/Contenedor';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InicioSesion from './componentes/InicioSesion.js'
import EditarGasto from './componentes/EditarGasto'
import GastosPorCategoria from './componentes/GastosPorCategoria'
import ListaDeGastos from './componentes/ListaDeGastos'
import RegistroUsuarios from './componentes/RegistroUsuarios'
import { Helmet } from 'react-helmet';
import favicon from './imagenes/logo.png'
import Fondo from './elementos/Fondo';

WebFont.load({
	google: {
		families: ['Work Sans:400,500,700', 'sans-serif']
	}
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<React.StrictMode>
		<>
			<Helmet>
				<link rel='shortcut icon' href={favicon} type='image/x-icon' />
			</Helmet>
			<BrowserRouter>
				<Contenedor>
					<Routes>
						<Route path='/iniciar-sesion' element={<InicioSesion />}/>
						<Route path='/crear-cuenta' element={<RegistroUsuarios />}/>
						<Route path='/categorias' element={<GastosPorCategoria />}/>
						<Route path='/lista' element={<ListaDeGastos />}/>
						<Route path='/editar/:id' element={<EditarGasto />}/>
						<Route path='/' element={<App />} />
					</Routes>
				</Contenedor>
			</BrowserRouter>

			<Fondo />
		</>
	</React.StrictMode>
);
