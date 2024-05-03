import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from "@react-navigation/native"
import { colors } from '../../utils/styles'
import Input from '../ui/Input'
import logo from "../../assets/logo.jpeg"

const AuthForm = ({ isLogin, credentialsInvalid, onSubmit, loginAsGuest }) => {

  const navigation = useNavigation()

  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');
  const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

  const {
    email: emailIsInvalid,
    confirmEmail: emailsDontMatch,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  const submitHandler = () => {
    onSubmit({ email: enteredEmail, confirmEmail: enteredConfirmEmail, password: enteredPassword, confirmPassword: enteredConfirmPassword})
  }
  const handlePw = () => {
    console.log("forgot password")
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={logo}>

        <View style={styles.backgroundOverlay}>
          <Text style={styles.heading}>{isLogin ? "LOG IN" : "SIGN UP"}</Text>

          <View style={styles.inputGroup}>
            <Input
              label="Email Address"
              onUpdateValue={(value) => setEnteredEmail(value)}
              value={enteredEmail}
              keyboardType="email-address"
              isInvalid={emailIsInvalid}
            />
            {!isLogin && (
              <Input
                label="Confirm Email Address"
                onUpdateValue={(value) => setEnteredConfirmEmail(value)}
                value={enteredConfirmEmail}
                keyboardType="email-address"
                isInvalid={emailsDontMatch}
              />
            )}
            <Input
              label="Password"
              onUpdateValue={(value) => setEnteredPassword(value)}
              secure
              value={enteredPassword}
              isInvalid={passwordIsInvalid}
            />
            {!isLogin && (
              <Input
                label="Confirm Password"
                onUpdateValue={(value) => setEnteredConfirmPassword(value)}
                secure
                value={enteredConfirmPassword}
                isInvalid={passwordsDontMatch}
              />
            )}
          </View>

          {isLogin &&
            <Pressable
              style={styles.forgotPasswordButton}
              onPress={handlePw}
            >
              <Text style={styles.forgotPasswordText}> <Text>Forgot Password?</Text></Text>
            </Pressable>}


          <View style={styles.buttonGroup}>
            <Pressable
              style={styles.submitButton}
              onPress={submitHandler}
            >
              <Text style={styles.buttonText}>{isLogin ? "LOG IN" : "SIGN UP"}</Text>
            </Pressable>
            <Pressable
              style={styles.guestButton}
              onPress={loginAsGuest}
            >
              <Text style={styles.guestButtonText}>TAKE A TOUR</Text>
            </Pressable>
          </View>


          <View style={styles.altGroup}>
            <Text style={styles.altText}>{isLogin ? "Don't have" : "Have"} an account?</Text>
            <Pressable
              style={styles.altButton}
              onPress={isLogin ? () => navigation.navigate("Signup") : () => navigation.navigate("Login")}
            >
              <Text style={styles.altButtonText}>{isLogin ? "SIGN UP" : "LOGIN"}</Text>
            </Pressable>
          </View>
        </View>




      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  backgroundOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.95)",
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  heading: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
  },
  inputGroup: {

  },
  forgotPasswordButton: {

  },
  forgotPasswordText: {
    color: colors.colorGray
  },
  buttonGroup: {
    alignItems: "center",
    gap: 20,
  },
  submitButton: {
    alignItems: "center",
    width: 300,
    borderRadius: 50,
    paddingVertical: 16,
    backgroundColor: colors.color,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  altGroup: {
    flexDirection: "row",
    gap: 2,
  },
  altText: {
    color: colors.colorGray
  },
  altButton: {

  },
  altButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  },
  guestButton: {
    alignItems: "center",
    width: 300,
    borderRadius: 50,
    borderColor: "#FFFFFF",
    borderWidth: 1.2,
    paddingVertical: 16,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  guestButtonText: {
    color: "#FFFFFF",
    fontWeight: "700"
  }
})

export default AuthForm