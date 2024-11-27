import React, { useEffect, useState } from 'react'
import getUser from '../helpers/getUser';

const initialUser = {
    name: 'Carlos',
    email: 'carlos@correo.com',
    frase: 'Usuario indica que no tiene el Office 365 en el escritorio.'
}

const FetchCard = () => {

    const [user, setUser] = useState(initialUser);
    const [loading, setLoading] = useState(true);

    const updateUser = () => {
        setLoading(true);

        getUser()
           .then((newUser) => {
            setUser(newUser);

            setTimeout(() => {
                setLoading(false);
            }, 1000);
            
        });
    }

    useEffect(() => { 
       updateUser()

       //TRAER 3 PALABRAS DE UNA FRASE

    //    const word = initialUser.frase.split(' ').slice(0, 3).join(' ');    
    //    const word1 = initialUser.frase.split(' ', 3).join(' ');  
       
    //    console.log('word: ' + word);
    //    console.log('word1: ' + word1);

    }, []);

    const deleteUser = () => {
        const changedUser = [];
        setUser(changedUser);
    }

  return (

    <div>

        {loading ? (<h1>Cargando...</h1>) : (<> <h1>Usuario: {user.name}</h1>
        <h1>Correo: {user.email}</h1>
        <h1>Teléfono: {user.phone}</h1>
        <button onClick={updateUser}>Otro Usuario</button>
        <button onClick={deleteUser}>Eliminar</button>
        </>)}
      
    </div>
  )
}

export default FetchCard;
