import React, { createContext, useState } from 'react';

export const ThemeContext=createContext();
const ThemeProvider = ({children}) => {
    const [dark,setDark]=useState(false);
  const mintMatte=dark ? "#1A2B1C" : "#B8D8BA";
  const eucalyptus=dark ? "#4A6B3A" : "#7FB069";
  const forestMatte=dark ? "#E8F0F0" : "#2F4F4F";
  const charcoalGreen=dark ? "#D3E5D4" : "#2C3E2D";
  const creamSage=dark ? "#0B0F0A" : "#F4F6F0";
  const danger=dark ? "#E67A6F" : "#C85A54";     
  const warning=dark ? "#E6C48A" : "#D4A574";
    const themeInfo={
        dark,
        setDark,
        mintMatte,
eucalyptus,
forestMatte,
charcoalGreen,
creamSage,
danger,
warning,
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
          {children}
        </ThemeContext.Provider>
    );
};
       

export default ThemeProvider;