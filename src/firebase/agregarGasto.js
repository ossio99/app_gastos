import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"

const agregarGasto = async ({descripcion, cantidad, categoria, fecha, uidUsuario}) => {
    //retornamos porque devuelve una promesa
    //si la promesa es devuelta resetearemos los inputs y mandaremos una alerta
    return await addDoc(collection(db, 'gastos'),{
        descripcion,
        cantidad,
        categoria,
        fecha,
        uidUsuario
    })
}

export default agregarGasto;