import React, { createContext, useEffect, useState } from 'react';
import settings from '../config/settings.json'

export const ThemeContext = createContext({
  theme: null,
  setTheme: () => {},
});

function getTheme(setTheme) {
  fetch(`${settings.serverUrl}/api/themes/`)
    .then((res) => res.json())
    .then((data) => {
      setTheme(data);
    })
    .catch((err) => {
      console.error(err);
    });
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    getTheme(id,setTheme);
  }, [id]);

 

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
