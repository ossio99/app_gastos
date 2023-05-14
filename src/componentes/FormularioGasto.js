import React, { useState } from 'react'
import { ContenedorFiltros, Formulario, Input, InputGrande, ContenedorBoton } from '../elementos/ElementosDeFormulario'
import Boton from '../elementos/Boton'
import { ReactComponent as IconoPlus } from '../imagenes/plus.svg'
import SelectCategorias from './SelectCategorias'
import DatePicker from './DatePicker'
import agregarGasto from '../firebase/agregarGasto'
import fromUnixTime from 'date-fns/fromUnixTime'
import getUnixTime from 'date-fns/getUnixTime'
import { useAuth } from '../contextos/AuthContext'
import Alerta from '../elementos/Alerta'
import BarraTotalGastado from './BarraTotalGastado'

const FormularioGasto = () => {
    const [inputDescripcion, cambiarInputDescripcion] = useState('');
    const [inputCantidad, cambiarInputCantidad] = useState('');
    const [categoria, cambiarCategoria] = useState('hogar');
    //el estado tendra por defecto la fecha actual
    const [fecha, cambiarFecha] = useState(new Date());
    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState({});

    const { usuario } = useAuth();

    const handleChange = (e) => {
        if (e.target.name === 'descripcion') {
            cambiarInputDescripcion(e.target.value);
        } else if (e.target.name === 'cantidad') {
            //expresion regular que reemplaza lo que no sea del 0-9 por nada
            cambiarInputCantidad(e.target.value.replace(/[^0-9.]/g, ''));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        //transformamos la cantidad en numero y le pasamos 2 decimales
        let cantidad = parseFloat(inputCantidad).toFixed(2);



        //compromaos que haya una descripcion y valor
        if (inputDescripcion !== '' && inputCantidad !== '') {

            //si por alguna razon alguien pudiera poner otro caracter en input cantidad
            //parse float devolveria null
            if (cantidad) {
                agregarGasto({
                    descripcion: inputDescripcion,
                    cantidad,
                    categoria,
                    fecha: getUnixTime(fecha),
                    //le pasamos el id del usuario que esta con la sesion iniciada
                    uidUsuario: usuario.uid
                }) 
                .then(() => {
                    cambiarInputDescripcion('');
                    cambiarInputCantidad('');
                    cambiarCategoria('hogar');
                    cambiarFecha(new Date());
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({tipo: 'exito', mensaje: 'El gasto fue guardado correctamente'})


                })
                .catch((error) => {
                    cambiarEstadoAlerta(true);
                    cambiarAlerta({tipo: '', mensaje: 'Hubo un error'})
                    console.log(error);
                })
            } else {
                cambiarEstadoAlerta(true);
                cambiarAlerta({ tipo: 'error', mensaje: 'El valor que ingresaste no es correcto' });
            }

        } else {
            cambiarEstadoAlerta(true);
            cambiarAlerta({ tipo: 'error', mensaje: 'Llena todos los campos' });
        }
    }



    return (
        <>
            <Formulario onSubmit={handleSubmit}>
                <ContenedorFiltros>
                    <SelectCategorias categoria={categoria} cambiarCategoria={cambiarCategoria} />
                    <DatePicker fecha={fecha} cambiarFecha={cambiarFecha} />
                </ContenedorFiltros>
                <div>
                    <Input
                        type='text'
                        name='descripcion'
                        placeholder='Descripción del gasto'
                        value={inputDescripcion}
                        onChange={handleChange}
                    />
                    <InputGrande
                        type='text'
                        name='cantidad'
                        placeholder='$0.00'
                        value={inputCantidad}
                        onChange={handleChange}
                    />
                </div>
                <ContenedorBoton>
                    <Boton as='button' primario conIcono type='submit'>
                        Agregar gasto <IconoPlus />
                    </Boton>
                </ContenedorBoton>
                <Alerta
                    tipo={alerta.tipo}
                    mensaje={alerta.mensaje}
                    estadoAlerta={estadoAlerta}
                    cambiarEstadoAlerta={cambiarEstadoAlerta}
                />
            </Formulario>
            <BarraTotalGastado />
        </>
    )
}

export default FormularioGasto