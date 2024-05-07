import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import BookTile from './BookTile'

const SearchResults = ({ searchResults }) => {
  return (
    <View style={styles.container}>
      {searchResults?.map((item, index) => <BookTile key={index} book={item} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    rowGap: 6,
  }
})

export default SearchResults