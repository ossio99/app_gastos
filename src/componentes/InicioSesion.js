import React, { useState } from 'react'
import { Header, Titulo, ContenedorHeader } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import Boton from '../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/login.svg'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { auth } from '../firebase/firebaseConfig'
import { signInWithEmailAndPassword } from "firebase/auth";
import Alerta from '../elementos/Alerta'


const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 12.5rem;
	margin-bottom: 1.25rem;
`;

const InicioSesion = () => {
	const navigate = useNavigate();
	const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	// const {usuario, cambiarUsuario} = useAuth();

	const handleChange = (e) => {
		if (e.target.name === 'email') {
			establecerCorreo(e.target.value);
		} else if (e.target.name === 'password') {
			establecerPassword(e.target.value);
		}
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		cambiarEstadoAlerta(false);
		cambiarAlerta({})

		//comprobamos del lado del cliente que el correo sea valido
		const expresionRegular = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;
		if (!expresionRegular.test(correo)) {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Correo invalido'
			})
			return;
		}

		if (correo === '' || password === '') {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Llena todos los campos'
			})
			return;
		}

		try {
			await signInWithEmailAndPassword(auth, correo, password)
			navigate('/')
			// cambiarUsuario()
		} catch (error) {
			let mensaje;
			switch (error.code) {
				case 'auth/wrong-password':
					mensaje = 'Contraseña incorrecta'
					break;
				case 'auth/user-not-found':
					mensaje = 'Usuario no encontrado'
					break;
				default:
					mensaje = 'Hubo un error al intentar crear la cuenta.'
					break;

			}
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje
			});
		}
	}

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
			<Formulario onSubmit={handleSubmit}>
				<Input
					type='email'
					name='email'
					placeholder='Correo electronico'
					value={correo}
					onChange={handleChange}
				/>
				<Input
					type='password'
					name='password'
					placeholder='Contraseña'
					value={password}
					onChange={handleChange}
				/>
				<ContenedorBoton>
					<Boton as='button' primario type='submit'>Iniciar sesion</Boton>
				</ContenedorBoton>
			</Formulario>

			<Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta} />

		</>
	)
}

export default InicioSesion