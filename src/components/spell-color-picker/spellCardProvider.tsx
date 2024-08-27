import { useState } from 'react';
import SpellCardContext from './spellCardContext'

const SpellCardProvider = ({ children }: any) => {
    const [cardOne, setCardOne] = useState(false);
    const [cardTwo, setCardTwo] = useState(false);
  
    const setShowCardOne = () => setCardOne(prev => !prev);
  
    const setShowCardTwo = () => setCardTwo(prev => !prev);
  
    // Передаем данные и функции в контекст провайдера
    return (
      <SpellCardContext.Provider value={{setShowCardOne, setShowCardTwo, showCardOne: cardOne, showCardTwo: cardTwo}}>
        {children}
      </SpellCardContext.Provider>
    );
  };
  
  export default SpellCardProvider;