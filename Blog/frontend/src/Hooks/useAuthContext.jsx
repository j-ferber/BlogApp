import { useContext } from "react";
import { UserContext } from "../Context/authContext";
  
export const useUserContext = () => {
  const context = useContext(UserContext)
  if (!context) throw Error('Wrong use of useUserContext')
  return context
}