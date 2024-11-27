///OCULTAR CAJAS CON useState

import React, { useState } from 'react';

const Box = () => {

    const [box, setBox] = useState(false);
    const styles = {
        height: 500,
        width: 500,
        backgroundColor: '#abffab',
        border: '1px solid #ccc',
        textAlign: 'center',
        marginTop: 2,


    };
    const stylesBtn = {
        display: 'flex',
        borderRadius: '1px solid #ccc',
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'

    };
    const stylesDiv = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'

    };

    const changeBox = () => {
        setBox(!box);
    }
    return (
        <> 
        <main style={stylesDiv}>
        <div style={stylesDiv}>
            <button style={stylesBtn} onClick={changeBox}>{ box ? 'Ocultar' : 'Mostrar'}</button>

        </div>

            {
                box && <div style={styles}>Caja</div>
            }
        </main>
        
        </>
    );

};

export default Box;

