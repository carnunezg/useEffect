import React, { useEffect, useState } from 'react';

const GetUsers = () => {
   const [getUsers, setGetUsers] = useState([]);
   const [filteredUsers, setFilteredUsers] = useState([]);
   const [isEmpty, setIsEmpty] = useState(false);
   const [searchString, setSearchString] = useState('');

   useEffect(() => {
       getData();
   }, []);

   const getData = async () => {
       const url = 'https://rickandmortyapi.com/api/character/';
       const res = await fetch(url);
       const data = await res.json();

       const users = data.results.map((user) => ({
           id: user.id,
           name: user.name,
           image: user.image
       }));

       setGetUsers(users);
       setFilteredUsers(users); // Inicialmente mostramos todos los usuarios
       setIsEmpty(false);
       setSearchString('');

   };

   const searchUser = (e) => {
       const searchValue = e.target.value;
       setSearchString(searchValue);

       if (searchValue === '') {
           setFilteredUsers(getUsers); // Mostrar todos los usuarios si el campo está vacío

       } else {
           const searchResults = getUsers.filter((user) =>
               user.name.toLowerCase().includes(searchValue.toLowerCase())
           );
           setFilteredUsers(searchResults);
           setIsEmpty(searchResults.length === 0);
       }
   };

   const deleteUser = (userId) => {
       const updatedUsers = filteredUsers.filter((user) => user.id !== userId);
       setFilteredUsers(updatedUsers);
       setIsEmpty(updatedUsers.length === 0);

       // También actualizamos `getUsers` para reflejar los cambios de eliminación
       setGetUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
   };

   const styles = {
       display: 'grid',
       textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
   };

   const stylesBtn = {
       display: 'flex',
       width: '50%',
       textAlign: 'center',
       justifyContent: 'center',
       alignItems: 'center',
       cursor: 'pointer',
       columnGap: '7rem',
   };

   const stylesInput = {
    display: 'flex',
    width: '500',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: '7rem',
    textAlign: 'left',
    fontSize: '18px',
    padding: '20px',
    borderRadius: '20px'
};

// const linea = {
//     border: '6px', 
//     solid: 'black', 
//     width: '80%',
//     margin: '20px',
// }

   return (
       <main>
           <div style={stylesInput}>
               <input
                   type="text"
                   placeholder="Buscar..."
                   onChange={searchUser}
                   value={searchString} 
               />
           </div>
           {isEmpty ? (
               <div style={styles}>
                   <h2>Sin Resultados.</h2>
                   <hr />
                   <button style={stylesBtn} onClick={getData}>Recargar</button>
               </div>
           ) : (
               filteredUsers.map((user) => (
                   <section style={styles} key={user.id}>
                       <h3>Id: {user.id}</h3>
                       <p>Nombre: {user.name}</p>
                       <img src={user.image} alt={user.name} />
                       <hr />
                       <button onClick={() => deleteUser(user.id)}>Eliminar</button>
                       <hr />
                   </section>
               ))
           )}
       </main>
   );
};

export default GetUsers;
