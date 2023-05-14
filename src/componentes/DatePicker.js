import React, { useState, useEffect } from 'react'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import format from 'date-fns/format'
import { es } from 'date-fns/locale'
import styled from 'styled-components';
import theme from '../theme';

//se le asigna un valor por defecto ya que al cliquear 2 veces la misma fecha el estado
//adquiere el valor undefined
const formatFecha = (fecha = new Date()) => {
    return format(fecha, `dd 'de' MMMM 'de' yyyy'`, { locale: es })
}

const DatePicker = ({ fecha, cambiarFecha }) => {
    const [datePicker, cambiarDatePicker] = useState(false);

    useEffect(() => {
        cambiarDatePicker(false)
    
    }, [fecha])
    

    return (
        <ContenedorInput>
            <input type='text' readOnly value={formatFecha(fecha)} onClick={() => cambiarDatePicker(!datePicker)} />
            {datePicker &&
                <DayPicker 
                    mode="single" 
                    selected={fecha} 
                    onSelect={cambiarFecha} 
                    locale={es}
                    // onClick={() => cambiarDatePicker(!datePicker)}
                />
            }
        </ContenedorInput>
    )
}

const ContenedorInput = styled.div`
    position: relative;
 
    input {
        font-family: 'Work Sans', sans-serif;
        box-sizing: border-box;
        background: ${theme.grisClaro};
        border: none;
        cursor: pointer;
        border-radius: 0.625rem; /* 10px */
        height: 5rem; /* 80px */
        width: 100%;
        padding: 0 1.25rem; /* 20px */
        font-size: 1.5rem; /* 24px */
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        outline: none;
    }
 
    .rdp {
        position: absolute;
        left: -35px; //mio
    }
 
    .rdp-months {
        display: flex;
        justify-content: center;
    }
 
    .rdp-month {
        background: #fff;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        // padding: 20px; mio
        border-radius: 10px;
    }
 
    @media (max-width: 60rem) {
        /* 950px */
        & > * {
            width: 100%;
        }
    }
`;

export default DatePicker