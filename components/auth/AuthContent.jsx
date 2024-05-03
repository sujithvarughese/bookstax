import { Alert, StyleSheet, View } from 'react-native';
import { useState } from "react"
import AuthForm from './AuthForm'
import { useNavigation } from '@react-navigation/native'
import { useAuthContext } from '../../context/auth-context'
import connect from '../../utils/connect'

const AuthContent = ({ isLogin, onAuthenticate }) => {

  const [credentialsInvalid, setCredentialsInvalid] = useState({
    email: false,
    password: false,
    confirmEmail: false,
    confirmPassword: false,
  });

  const submitHandler = (credentials) => {
    let { email, confirmEmail, password, confirmPassword } = credentials;

    email = email.trim();
    password = password.trim();

    const emailIsValid = email.includes('@');
    const passwordIsValid = password.length > 6;
    const emailsAreEqual = email === confirmEmail;
    const passwordsAreEqual = password === confirmPassword;

    if (!emailIsValid || !passwordIsValid || (!isLogin && (!emailsAreEqual || !passwordsAreEqual))) {
      Alert.alert('Invalid input', 'Please check your entered credentials.');
      setCredentialsInvalid({
        email: !emailIsValid,
        confirmEmail: !emailIsValid || !emailsAreEqual,
        password: !passwordIsValid,
        confirmPassword: !passwordIsValid || !passwordsAreEqual,
      });
      return;
    }
    onAuthenticate({ email, password })
  }

  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { authenticateUser } = useAuthContext()
  const loginAsGuest = async () => {
    try {
      setIsAuthenticating(true)
      const response = await connect.post("auth/guest")
      const { token } = response.data
      authenticateUser(token)
    } catch (error) {
      Alert.alert("Authentication failed")
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <View style={styles.container}>
      <AuthForm isLogin={isLogin} credentialsInvalid={false} onSubmit={submitHandler} loginAsGuest={loginAsGuest}/>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
})

export default AuthContent