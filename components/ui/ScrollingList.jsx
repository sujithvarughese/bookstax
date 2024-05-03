import { FlatList, StyleSheet, Text, View } from 'react-native'
import BookTile from './BookTile'

const ScrollingList = ({ genre, list }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Latest {genre} News</Text>
      {list. length > 0 &&
        <FlatList
          style={styles.list}
          horizontal={true}
          initialNumToRender={4}
          keyExtractor={item => item.title}
          data={list}
          renderItem={({item}) => <BookTile title={item.title} author={item.author} coverImage={item.book_image} />}
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
  list: {
    height: 235,
  }
})
export default ScrollingList