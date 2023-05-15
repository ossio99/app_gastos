import React from 'react'
import { ReactComponent as IconoCerrarSesion } from '../imagenes/log-out.svg'
import Boton from './Boton'
import { auth } from '../firebase/firebaseConfig';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

const BotonCerrarSesion = () => {
	const navigate = useNavigate();

	const cerrarSesion = async () => {
		try {
			await signOut(auth);
			console.log(auth);
			navigate('/iniciar-sesion');

		} catch (error) {
			console.log(error);
		}

	}

	return (
		//se le pone la propiedad as porque por defecto este componente es un Link de react-router
		<Boton iconoGrande as='button' onClick={cerrarSesion}>
			<IconoCerrarSesion />
		</Boton>
	)
}

export default BotonCerrarSesion