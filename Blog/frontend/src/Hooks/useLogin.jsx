import { useState } from "react";
import { useUserContext } from "./useAuthContext";
import axios from "axios";
import { usePostsContext } from "./usePostsContext";

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const { dispatch } = useUserContext()
  const {setError: setPostsError} = usePostsContext()
  
  const login = async (username, password) => {
    setPostsError(null)
    setLoading(true)
    setError(null)
    const response = await axios.post('https://jotterbackend.onrender.com/user/login', { username, password }, { validateStatus: () => true })
    if (response.status === 400) {
      setError(response.data.error)
      setLoading(false)
    } else if (response.status === 200) {
      localStorage.setItem('user', JSON.stringify(response.data))
      dispatch({ type: 'LOGIN', payload: response.data })
      setLoading(false)
    }
  }

  return {login, loading, error}
}