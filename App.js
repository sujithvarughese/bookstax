import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuthContext } from './context/auth-context'
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator'
import PublicNavigator from './navigation/PublicNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'


const Navigation = () => {

  const { isAuthenticated, authenticateUser, userId } = useAuthContext()
  const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true)


  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token")
      const userId = await AsyncStorage.getItem("userId")
      if (storedToken) {
        authenticateUser(storedToken, userId)
      }
      setIsAuthenticatingUser(false)
    }
    fetchToken()
  }, [userId])

  const [darkMode, setDarkMode] = useState(false)

  return (
    <NavigationContainer style={{ flex: 1 }}>
      {isAuthenticated ? <AuthenticatedNavigator /> : <PublicNavigator />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
}

const App = () => {

  return (

        <AuthProvider>
          <Navigation />
        </AuthProvider>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App