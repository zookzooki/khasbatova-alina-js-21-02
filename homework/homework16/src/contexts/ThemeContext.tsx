import React, { ReactNode, useState } from 'react';

import { DARK_THEME, TRUE_STRING } from '../constants/common';

interface Props {
  children: ReactNode;
}

export interface ThemeContextState {
  darkTheme: boolean;
  toggleTheme: (value: boolean) => void;
}

const ThemeContext = React.createContext<Partial<ThemeContextState>>({});

const ThemeContextProvider = ({ children }: Props) => {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem(DARK_THEME) === TRUE_STRING);
  const toggleTheme = (value: boolean) => {
    setDarkTheme(value);
  };

  return (
    <ThemeContext.Provider value={{
      darkTheme,
      toggleTheme,
    }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContextProvider, ThemeContext };
