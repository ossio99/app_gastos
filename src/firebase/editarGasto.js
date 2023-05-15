import { db } from "./firebaseConfig"
import { doc, updateDoc } from "firebase/firestore";

const editarGasto = async ({ id, descripcion, cantidad, categoria, fecha }) => {

    const documento = doc(db, "gastos", id);

    //retornamos porque devuelve una promesa
    //si la promesa es devuelta resetearemos los inputs y mandaremos una alerta
    return await updateDoc(documento, {
        descripcion,
        cantidad,
        categoria,
        fecha
    });
}

export default editarGasto;