import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/home/HomeScreen'

import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuthContext } from '../context/auth-context'
import IconButton from '../components/ui/IconButton'

import { colors } from '../utils/styles'
import LibraryStack from './LibraryStack'
import DiscoverStack from './DiscoverStack'
import SearchScreen from '../screens/SearchScreen'



const Tab = createBottomTabNavigator()
const AuthenticatedNavigator = () => {

  const { logoutUser } = useAuthContext()

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={logoutUser}/>,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.color
          }
        }}
      />
      <Tab.Screen
        name="Library Stack"
        component={LibraryStack}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={logoutUser}/>,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.color
          }
        }}
      />
      <Tab.Screen
        name="Discover Stack"
        component={DiscoverStack}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={logoutUser}/>,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.color
          }
        }}
      />
      <Tab.Screen
        name="Search Stack"
        component={SearchScreen}
        options={{
          tabBarLabel: "Search",
          tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={logoutUser}/>,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.color
          }
        }}
      />
    </Tab.Navigator>
  )
}
export default AuthenticatedNavigator