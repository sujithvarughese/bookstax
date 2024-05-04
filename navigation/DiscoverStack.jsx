import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LibraryScreen from '../screens/LibraryScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import BookScreen from '../screens/BookScreen'

const Stack = createNativeStackNavigator()
const DiscoverStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Discover">
      <Stack.Screen name="Discover" component={DiscoverScreen} />
      <Stack.Screen name="Book" component={BookScreen} />
    </Stack.Navigator>
  )
}

export default DiscoverStack