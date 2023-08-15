import { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext()

export const ThemeContextProvider = ({ children }) => {
  const state = JSON.parse(localStorage.getItem('theme')) || false
  const [theme, setTheme] = useState(state)

  useEffect(() => {
    const storedTheme = JSON.parse(localStorage.getItem('theme'))
    if (storedTheme !== null) setTheme(storedTheme)
  }, [])
  
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      {children}
    </ThemeContext.Provider>
  )
}