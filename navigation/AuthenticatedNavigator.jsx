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
    <Tab.Navigator screenOptions={{
      tabBarStyle: {
        backgroundColor: "black"
      },
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "gray",
      headerStyle: {
        backgroundColor: "black"
      }
    }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          lazy: true,
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24}  color={color}/>,
          tabBarActiveTintColor: "white",
          headerRight: ({ tintColor }) => <IconButton icon="exit" color="white" size={24} onPress={logoutUser}/>,
          headerTitle: "",
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: "Library",
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color}/>,
          headerTitle: "Library",
          headerTintColor: "white"
        }}
      />
      <Tab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarLabel: "Discover",
          tabBarIcon: ({ color }) => <FontAwesome5 name="home" size={24} color={color} />,
          headerTitle: "Discover",
          headerTintColor: "white"
        }}
      />
    </Tab.Navigator>
  )
}
export default AuthenticatedNavigator