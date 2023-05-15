import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";


const useObtenerGasto = (id) => {
    const navigate = useNavigate();
    const [gasto, establecerGasto] = useState('');

    useEffect(() => {
        const obtenerGasto = async() => {
            const documento = await getDoc(doc(db, "gastos", id));

            if (documento.exists()) {
                //devolvemos el documento en crudo porque si le aplicamos el metodo data()
                //la data no tiene el id del doc
                establecerGasto(documento);
            } else {
                navigate('/lista')
            }
        }

        obtenerGasto();
        //i really don't get it
    }, [navigate, id]);

    return [gasto];
}

export default useObtenerGasto;