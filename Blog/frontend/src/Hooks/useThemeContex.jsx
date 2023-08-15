import { useContext } from "react";
import { ThemeContext } from "../Context/themeContext";

export const useThemeContext = () => {
  const context = useContext(ThemeContext)
  if (!context) throw Error('Wrong use of useThemeContext')
  return context
}