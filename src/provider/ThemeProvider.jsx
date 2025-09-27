import React, { createContext, useState } from 'react';

export const ThemeContext=createContext();
const ThemeProvider = ({children}) => {
    const [dark,setDark]=useState(true);
  const lightTheme = {
  mintMatte: "#B8D8BA",
  eucalyptus: "#7FB069",
  forestMatte: "#2F4F4F",
  charcoalGreen: "#2C3E2D",
  creamSage: "#F4F6F0",
  danger: "#C85A54",
  warning: "#D4A574",
};

const darkTheme = {
  mintMatte: "#1A2B1C",
  eucalyptus: "#4A6B3A",
  forestMatte: "#E8F0F0",
  charcoalGreen: "#D3E5D4",
  creamSage: "0B0F0A#",
  danger: "#E67A6F",
  warning: "#E6C48A",
};
const theme=dark ? darkTheme : lightTheme;

    const themeInfo={
        dark,
        setDark,
        theme,
    }
    return (
        <ThemeContext.Provider value={themeInfo}>
          {children}
        </ThemeContext.Provider>
    );
};
       

export default ThemeProvider;