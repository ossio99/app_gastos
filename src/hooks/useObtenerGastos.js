import { useEffect, useState } from 'react'
import { db } from '../firebase/firebaseConfig'
import { collection, onSnapshot, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import {useAuth} from '../contextos/AuthContext'


const useObtenerGastos = () => {
    const [gastos, cambiarGastos] = useState([]);
    const {usuario} = useAuth();
    const [ultimoGasto, cambiarUltimoGasto] = useState(null);
    const [hayMasPorCargar, cambiarHayMasPorCargar] = useState(false);

    //al ejecutarse este metodo se ejecuta onSnapshot a partir del ultimo gasto anterior
    //si gastos > 0 asignamos nuevo ultomoGasto y cambiamos gastos
    //de lo contrario hayMasPorCargar sera false
    const obtenerMasGastos = () => {
        const consulta = query(collection(db, "gastos"), 
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10),
            startAfter(ultimoGasto),
        )

        onSnapshot(consulta,(snapshot) => {
            if(snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs.length -1);

                //concatenamos a gastos los nuevos gastos que se consultaron
                cambiarGastos(gastos.concat(snapshot.docs.map((gasto) => {
                    return {...gasto.data(), id: gasto.id}
                })))
            }else {
                cambiarHayMasPorCargar(false);
            }
        }, error => console.log(error));

        
    }

    useEffect(() => {

        const consulta = query(collection(db, "gastos"), 
            where('uidUsuario', '==', usuario.uid),
            orderBy('fecha', 'desc'),
            limit(10)
        );

        //firebase nos retorna una funcion para desuscribirnos
        const unsuscribe = onSnapshot(consulta, (snapshot) => {

            if(snapshot.docs.length > 0) {
                cambiarUltimoGasto(snapshot.docs[snapshot.docs.length -1]);
                cambiarHayMasPorCargar(true);
            }else {
                cambiarHayMasPorCargar(false);
            }

            // console.log(snapshot.docs[0].id);
            // console.log(snapshot.docs[0].data());
            // console.log(snapshot.docs[0].data());
            cambiarGastos(snapshot.docs.map((gasto) => {
                // console.log(gasto.data());
                // return gasto.data();

                //devolvemos un objeto con toda la data del gasto y el id propio del gasto
                //al crear un documento firebase le asigna un id
                return {...gasto.data(), id: gasto.id}
            }))

            return unsuscribe;
        })


        //el efecto se ejecutara al inicio de la carga o cuando cambie usuario
        //cuando usuario cambien nos queremos conectar a la db para traer los nuevos gastos
    }, [usuario])

    return [gastos, obtenerMasGastos, hayMasPorCargar];
}

export default useObtenerGastos;