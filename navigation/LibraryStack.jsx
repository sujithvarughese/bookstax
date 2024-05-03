import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import LibraryScreen from '../screens/LibraryScreen'

const Stack = createNativeStackNavigator()
const LibraryStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Library">
      <Stack.Screen name="Library" component={LibraryScreen} />
    </Stack.Navigator>
  )
}

export default LibraryStack