import { FlatList, StyleSheet, Text, View } from 'react-native'
import BookTile from '../BookTile'

const ScrollingList = ({ genre, list }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{!!genre && genre}</Text>
      {list.length > 0 &&
        <FlatList
          style={styles.list}
          horizontal={true}
          initialNumToRender={4}
          keyExtractor={item => item.title}
          data={list}
          renderItem={({item}) =>
            <View style={styles.item}>
              <BookTile book={{ ...item }} />
            </View>
            }
        />
      }
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    gap: 4,
    paddingTop: 12,
    paddingHorizontal: 6,
  },
  text: {
    fontWeight: "700",
    textTransform: "capitalize"
  },
  item: {
    marginRight: 6
  }
})
export default ScrollingList