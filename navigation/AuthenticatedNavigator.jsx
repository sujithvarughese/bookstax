import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useAuthContext } from '../context/auth-context'
import { colors } from '../utils/styles'
import { FontAwesome5 } from '@expo/vector-icons';
import IconButton from '../components/ui/IconButton'
import HomeScreen from '../screens/HomeScreen'
import DiscoverScreen from '../screens/DiscoverScreen'
import LibraryScreen from '../screens/LibraryScreen'

const Tab = createBottomTabNavigator()
const AuthenticatedNavigator = () => {

  const { userId, logoutUser } = useAuthContext()

  if (!userId) return

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          lazy: true,
          tabBarIcon: () => <FontAwesome5 name="home" size={24} color="black" />,
          headerRight: ({ tintColor }) => <IconButton icon="exit" color={tintColor} size={24} onPress={logoutUser}/>,
          headerTitle: "",
          headerStyle: {
            backgroundColor: colors.color
          }
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
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
        name="Discover"
        component={DiscoverScreen}
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
    </Tab.Navigator>
  )
}
export default AuthenticatedNavigator