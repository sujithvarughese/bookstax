import { createContext, useContext, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  authenticateUser: () => {},
  logoutUser: () => {}
})

const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState()

  const authenticateUser = (token) => {
    setAuthToken(token)
    AsyncStorage.setItem("token", token)
  }

  const logoutUser = () => {
    setAuthToken(null)
    AsyncStorage.removeItem("token")
  }

  return <AuthContext.Provider value={
    {
      token: authToken,
      isAuthenticated: !!authToken,
      authenticateUser,
      logoutUser
    }
  }>
    {children}
  </AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }