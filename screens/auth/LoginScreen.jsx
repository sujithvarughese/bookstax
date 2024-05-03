import { useState } from "react"
import AuthContent from '../../components/auth/AuthContent'
import connect from '../../utils/connect'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { useAuthContext } from '../../context/auth-context'
import { Alert } from 'react-native'

const LoginScreen = () => {

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const { authenticateUser } = useAuthContext()

  const loginHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true)
      const response = await connect.post("auth", { email, password, mode: "signInWithPassword" })
      const { token } = response.data
      authenticateUser(token)
    } catch (error) {
      Alert.alert("Authentication failed")
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />
  }

  return <AuthContent isLogin={true} onAuthenticate={loginHandler}/>
}

export default LoginScreen