import React, { useState } from 'react'

const DisabledInput = () => {

  const [input, setInput] = useState('');

  const changedInput = (e) => {
    setInput(e.target.value);

  };

  const buttonSend = (e) => {
    e.preventDefault();
    setInput('');
    
  };
  
  return (
    <main>
        <form>
            <input 
               type='text' 
               placeholder='Escribir...' 
               value={input}
               onChange={changedInput}
            />
            <button 
                disabled={input.length < 3}
                onClick={buttonSend}
            >{input ? 'Enviar' : 'Por enviar'}</button>
        </form>
      
    </main>
  )
}

export default DisabledInput;
