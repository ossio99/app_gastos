import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig"

// const agregarGasto = async ({descripcion, cantidad, categoria, fecha,uidUsuario}) => {
//     try {
//         await addDoc(collection(db, 'gastos'),{
//             descripcion,
//             cantidad,
//             categoria,
//             fecha,
//             uidUsuario
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }

//metodo falcon
const agregarGasto = ({descripcion, cantidad, categoria, fecha, uidUsuario}) => {
    return addDoc(collection(db, 'gastos'),{
        descripcion,
        cantidad,
        categoria,
        fecha,
        uidUsuario
    })
}

export default agregarGasto;