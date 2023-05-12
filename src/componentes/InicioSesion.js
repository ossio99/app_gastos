import React from 'react'
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import Boton from '../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/login.svg'
import styled from 'styled-components'

const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 12.5rem;
	margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
	return (
		<>
			<Helmet>
				<title>Iniciar sesion</title>
			</Helmet>
			<Header>
				<ContenedorHeader>
					<Titulo>Iniciar sesion</Titulo>
					<div>
						<Boton to='/crear-cuenta'>Registrarse</Boton>
					</div>
				</ContenedorHeader>
			</Header>
			<Svg />
			<Formulario>
				<Input type='email' name='email' placeholder='Correo electronico' />
				<Input type='password' name='password' placeholder='Contraseña' />
				<ContenedorBoton>
					<Boton as='button' primario type='submit'>Iniciar sesion</Boton>
				</ContenedorBoton>
			</Formulario>

		</>
	)
}

export default InicioSesion