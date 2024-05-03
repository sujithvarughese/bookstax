import { Text, View } from 'react-native'
import {Drawer, Colors } from 'react-native-ui-lib'


const DrawerItem = ({ item }) => {
  return (
    <Drawer
      rightItem={{ text: 'X', background: Colors.red30, onPress: () => console.log("pressed") }}
    >
      <View centerV padding-s4 bg-white style={{height: 60}}>
        <Text text70>{item}</Text>
      </View>

    </Drawer>
  )
}

export default DrawerItem