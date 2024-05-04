import { createContext, useContext, useState } from 'react'
import AsyncStorage from "@react-native-async-storage/async-storage"
const AuthContext = createContext({
  token: "",
  userId: "",
  email: "",
  isAuthenticated: false,
  authenticateUser: () => {},
  logoutUser: () => {}
})

const AuthProvider = ({ children }) => {

  const [authToken, setAuthToken] = useState()
  const [user, setUser] = useState(null)

  const authenticateUser = (token, email, userId) => {
    setAuthToken(token)
    setUser({ email, userId })
    AsyncStorage.setItem("token", token)
  }

  const logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    AsyncStorage.removeItem("token")
  }

  return <AuthContext.Provider value={
    {
      token: authToken,
      email: user?.email || null,
      userId: user?.userId || null,
      isAuthenticated: !!authToken,
      authenticateUser,
      logoutUser,
    }
  }>
    {children}
  </AuthContext.Provider>
}

const useAuthContext = () => useContext(AuthContext)

export { AuthProvider, useAuthContext }