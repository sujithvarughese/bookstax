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

  const authenticateUser = (token, userId) => {
    setAuthToken(token)
    setUser(userId)
    AsyncStorage.setItem("token", token)
    AsyncStorage.setItem("userId", userId)
  }

  const logoutUser = () => {
    setAuthToken(null)
    setUser(null)
    AsyncStorage.removeItem("token")
    AsyncStorage.removeItem("userId")
  }

  return <AuthContext.Provider value={
    {
      token: authToken,
      userId: user,
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