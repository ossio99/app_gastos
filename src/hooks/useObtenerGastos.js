import React, { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, limit } from "firebase/firestore";
import {useAuth} from '../contextos/AuthContext'


const useObtenerGastos = () => {
    const [gastos, cambiarGastos] = useState([]);
    const {usuario} = useAuth();

    useEffect(() => {



        const consulta = query(collection(db, "gastos"), 
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        //firebase nos retorna una funcion para desuscribirnos
        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            // console.log(snapshot.docs[0].id);
            // console.log(snapshot.docs[0].data());
            // console.log(snapshot.docs[0].data());
            cambiarGastos([snapshot.docs.map((gasto) => {
                // console.log(gasto.data());
                // return gasto.data();

                //devolvemos un objeto con toda la data del gasto y el id propio del gasto
                //al crear un documento firebase le asigna un id
                return {...gasto.data(), id: gasto.id}
            })])

            return unsuscribe;
        })


        //el efecto se ejecutara al inicio de la carga o cuando cambie usuario
        //cuando usuario cambien nos queremos conectar a la db para traer los nuevos gastos
    }, [usuario])

    return [gastos];
}

export default useObtenerGastos;