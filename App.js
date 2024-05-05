import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { useEffect, useState } from 'react'
import { AuthProvider, useAuthContext } from './context/auth-context'
import AuthenticatedNavigator from './navigation/AuthenticatedNavigator'
import PublicNavigator from './navigation/PublicNavigator'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Navigation = () => {

  const { isAuthenticated, authenticateUser } = useAuthContext()
  const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true)

  useEffect(() => {
    const fetchToken = async () => {
      const storedToken = await AsyncStorage.getItem("token")
      if (storedToken) {
        authenticateUser(storedToken, userId)
      }
      setIsAuthenticatingUser(false)
    }
    fetchToken()
  }, [])

  return (
    <NavigationContainer style={{ flex: 1 }}>
      {isAuthenticated ? <AuthenticatedNavigator /> : <PublicNavigator />}
      <StatusBar style="auto" />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App