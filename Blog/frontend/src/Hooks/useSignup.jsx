import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const useSignup = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const signup = async (username, password) => {
    setError(null)
    setLoading(true)
    const response = await axios.post('http://localhost:4000/user/signup', { username, password }, { validateStatus: () => true })
    if (response.status === 400) {
      setError(response.data.error)
      setLoading(false)
    } else if (response.status === 200) {
      navigate('/login')
      setLoading(false)
    }
  }

  return {signup, error, loading}
}