import React from 'react'
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import Boton from '../elementos/Boton'
import {Formulario, Input, ContenedorBoton} from '../elementos/ElementosDeFormulario'
import {ReactComponent as SvgLogin} from '../imagenes/registro.svg'
import styled from 'styled-components'

const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 6.25rem;
	margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
	return (
		<>
			<Helmet>
				<title>Crear cuenta</title>
			</Helmet>
			<Header>
				<ContenedorHeader>
					<Titulo>Crear cuenta</Titulo>
					<div>
						<Boton to='/iniciar-sesion'>Iniciar sesion</Boton>
					</div>
				</ContenedorHeader>
			</Header>
			<Svg />
			<Formulario>
				<Input type='email' name='email' placeholder='Correo electronico' />
				<Input type='password' name='password' placeholder='Contraseña' />
				<Input type='password' name='password2' placeholder='Repetir contraseña' />
				<ContenedorBoton>
					<Boton as='button' primario type='submit'>Crear cuenta</Boton>
				</ContenedorBoton>
			</Formulario>

		</>
	)
}

export default RegistroUsuarios