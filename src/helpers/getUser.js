const getUser = async () => {
    try {
        const userId = Math.floor(Math.random() * 10) + 1;
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const res = await fetch(url);
        
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const user = await res.json();
        return user;
        
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        return null; // o {} si prefieres un objeto vacío
    }
};

// sin usar el async await

// const getUser = () =>{
//     const userId = Math.floor((Math.random() * 10) + 1);
//     return fetch('https://jsonplaceholder.typicode.com/users/'+userId).then((res) => res.json());
// }
    

export default getUser














// const getPokemon = async () => {
//     try {
//         const userId = Math.floor(Math.random() * 10) + 1;
//         const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
//         const response = await fetch(url);

//         if(!response.ok){
//             throw new Error(`HTTP error! status: ${response.status}`);
            
//         }
//         const data = await response.json();
    
//         return data;

//     } catch (error) {
//         console.error('Error en', error);
//         return null;
        
//     }

    
// }