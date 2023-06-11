import React from 'react'
import theme from '../theme'
import styled from 'styled-components'

const BarraTotalGastado = () => {

	return (
		<BarraTotal>
			<p>Usuario</p>
			<p>Agelito</p>
		</BarraTotal>
	)
}

export default BarraTotalGastado;

const BarraTotal = styled.div`
    background: ${theme.verde};
    font-size: 1.25rem; /* 20px */
    letter-spacing: 1px;
    font-weight: 500;
    text-transform: uppercase;
    padding: 0.62rem 2.25rem; /* 10px 40px */
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
 
    @media(max-width: 31.25rem) { /* 500px */
        flex-direction: column;
        font-size: 14px;
    }
`;