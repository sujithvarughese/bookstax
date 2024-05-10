import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BookTile from './BookTile'

const BookList = ({ title, list }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {list.map((item, index) => <BookTile key={index} book={item} />)}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  },
  title: {

  },
  content: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },

})

export default BookList