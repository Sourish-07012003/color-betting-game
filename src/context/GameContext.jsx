import React, { createContext, useState } from 'react';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [history, setHistory] = useState([]);
  const [colorWins, setColorWins] = useState({ Red: 0, Green: 0, Blue: 0 });

  return (
    <GameContext.Provider value={{ history, setHistory, colorWins, setColorWins }}>
      {children}
    </GameContext.Provider>
  );
};
