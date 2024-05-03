import AuthContent from '../../components/auth/AuthContent'
import { useState } from 'react'
import connect from '../../utils/connect'
import LoadingOverlay from '../../components/ui/LoadingOverlay'
import { useAuthContext } from '../../context/auth-context'
import { Alert } from 'react-native'

const SignupScreen = () => {

  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const { authenticateUser } = useAuthContext()

  const signupHandler = async ({ email, password }) => {
    try {
      setIsAuthenticating(true)
      const response = await connect.post("auth", { email, password, mode: "signUp" })
      const { token } = response.data
      authenticateUser(token)
    } catch (error) {
      Alert.alert("Authentication failed")
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Signing up user..."/>
  }

  return <AuthContent isLogin={false} onAuthenticate={signupHandler}/>
}

export default SignupScreen