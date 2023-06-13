import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

//creamos el contexto
const AuthContext = React.createContext();

//hook pesonalizado para acceder al contexto
const useAuth = () => {
    return useContext(AuthContext);
}

const AuthProvider = ({ children }) => {
    //estado que contiene la sesion
    //solo tendra valor (el objeto que devuelve onAuthStateChanged) en caso de que se inicie sesion (que se ejecute signInWithEmailAndPassword()), de lo contrario su valor sera undefined
    const [usuario, cambiarUsuario] = useState();
    const [cargando, cambiarCargando] = useState(true);

    //efecto para ejecutar la comprobacion una sola vez
    useEffect(() => {
        //COMPROBAMOS SI HAY UN USUARIO
        //onAuthStateChanged comprueba cuando el estado cambia
        //onAuthStateChanged le devuelve a la funcion anonima un objeto con toda la info de usuario
        //este objeto solo es devuelto si se inicio sesion, osea si se ejecuto signInWithEmailAndPassword anteriormente si no devolvera null
        //onAuthStateChanged devuelve un metodo para cancelar la suscripcion
        const cancelarSuscripcion = onAuthStateChanged(auth, (usuario) => {
            cambiarUsuario(usuario);
            cambiarCargando(false);
        });

        return cancelarSuscripcion;
    }, [])


    return (
        //quitar del estado global y de inicio de sesion
        <AuthContext.Provider value={{ usuario, cambiarUsuario }}>
            {/* solo renderizamos children cuando cargando sea false
            ya que cuando cargando solo sera false  hasta que onAuthStateChanged
            se haya ejecutado, de esta forma nos aseguramos de no cargar el resto de 
            la app hasta que el usuario haya sido establecido*/}
            {!cargando && children}
        </AuthContext.Provider>
    );
}

// export { AuthProvider,AuthContext, useAuth };
export { AuthProvider, useAuth };