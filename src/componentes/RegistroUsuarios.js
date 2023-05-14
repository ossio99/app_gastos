import React, { useState } from 'react'
import { Header, Titulo, ContenedorHeader, ContenedorBotones } from '../elementos/Header'
import { Helmet } from 'react-helmet'
import Boton from '../elementos/Boton'
import { Formulario, Input, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import { ReactComponent as SvgLogin } from '../imagenes/registro.svg'
import styled from 'styled-components'
import { auth } from '../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import Alerta from '../elementos/Alerta'

const Svg = styled(SvgLogin)`
	width: 100%;
	max-height: 6.25rem;
	margin-bottom: 1.25rem;
`;

const RegistroUsuarios = () => {
	const navigate = useNavigate();
	const [correo, establecerCorreo] = useState('');
	const [password, establecerPassword] = useState('');
	const [password2, establecerPassword2] = useState('');
	const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
	const [alerta, cambiarAlerta] = useState({});

	const handleChange = e => {
		switch (e.target.name) {
			case 'email':
				establecerCorreo(e.target.value)
				break;
			case 'password':
				establecerPassword(e.target.value)
				break;
			case 'password2':
				establecerPassword2(e.target.value)
				break;

			default:
				break;
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

		if (correo === '' || password === '' || password2 === '') {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Llena todos los campos'
			})
			return;
		}

		if (password !== password2) {
			cambiarEstadoAlerta(true);
			cambiarAlerta({
				tipo: 'error',
				mensaje: 'Las contraseñas no coinciden'
			})
			return;
		}

		try {
			await createUserWithEmailAndPassword(auth, correo, password)
			navigate('/')
		} catch (error) {
			// console.log(error);
			// console.log(error.code);
			let mensaje;
			switch (error.code) {
				case 'auth/invalid-password':
					mensaje = 'La contraseña tiene que ser de al menos 6 caracteres.'
					break;
				case 'auth/email-already-in-use':
					mensaje = 'Ya existe una cuenta con el correo electrónico proporcionado.'
					break;
				case 'auth/invalid-email':
					mensaje = 'El correo electrónico no es válido.'
					break;
				case 'auth/weak-password':
					mensaje = 'La contraseña debería tener por lo menos seis caracteres'
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
				<Input
					type='password'
					name='password2'
					placeholder='Repetir contraseña'
					value={password2}
					onChange={handleChange}
				/>
				<ContenedorBoton>
					<Boton as='button' primario type='submit'>Crear cuenta</Boton>
				</ContenedorBoton>
			</Formulario>

			<Alerta tipo={alerta.tipo} mensaje={alerta.mensaje} estadoAlerta={estadoAlerta} cambiarEstadoAlerta={cambiarEstadoAlerta} />

		</>
	)
}

export default RegistroUsuarios;