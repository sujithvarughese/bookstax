import { Alert, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import { useState } from "react"
import { useNavigation } from "@react-navigation/native"
import logo from "../../assets/logo.jpeg"
import { colors } from '../../utils/styles'
import connect from '../../utils/connect'
import { useAuthContext } from '../../context/auth-context'
import LoadingOverlay from '../../components/ui/LoadingOverlay'

const WelcomeScreen = () => {

  const navigation = useNavigation()
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const { authenticateUser } = useAuthContext()
  const loginAsGuest = async () => {
    try {
      setIsAuthenticating(true)
      const response = await connect.post("auth/guest")
      const { token, userId } = response.data
      authenticateUser(token, userId)
    } catch (error) {
      Alert.alert("Authentication failed")
    } finally {
      setIsAuthenticating(false)
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message="Logging in user..." />
  }

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.background} source={logo}>
        <View style={styles.backgroundOverlay}>
          <View style={styles.textGroup}>
            <Text style={styles.welcome}>Welcome</Text>
            <View style={styles.logo}>
              <Text style={styles.med}>Book</Text>
              <Text style={styles.scope}>Stax</Text>
              <Image style={styles.image} source={logo} alt="logo"/>
            </View>
            <Text style={styles.caption}>Keeping your reading organized.</Text>
          </View>

          <View style={styles.buttonGroup}>
            <Pressable
              style={styles.loginButton}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>LOGIN NOW</Text>
            </Pressable>
            <Pressable
              style={styles.signupButton}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.buttonText}>SIGN UP</Text>
            </Pressable>
            <Pressable
              style={styles.guestButton}
              onPress={loginAsGuest}
            >
              <Text style={styles.guestButtonText}>TAKE A TOUR</Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textGroup: {
    alignItems: "center",
  },
  welcome: {
    color: "#FFFFFF",
    fontSize: 40,
    fontWeight: "700",
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 12,
  },
  med: {
    color: colors.colorGray,
    fontSize: 20,
    fontWeight: "600"
  },
  scope: {
    color: colors.color,
    fontSize: 20,
    fontWeight: "600"
  },
  image: {
    width: 30,
    height: 30
  },
  caption: {
    color: "#FFFFFF",
    fontSize: 16,
  },
  buttonGroup: {
    alignItems: "center",
    gap: 20,
  },
  loginButton: {
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
  signupButton: {
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

export default WelcomeScreen