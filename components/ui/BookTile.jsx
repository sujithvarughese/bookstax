import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const BookTile = ({ title, author, coverImage }) => {
  return (
    <View style={styles.container}>

      <Image resizeMode="cover" style={styles.image} source={{ uri: coverImage }} />

      <View style={styles.text} >
        <Text style={styles.source}>{title}</Text>
        <TouchableOpacity style={styles.touchable} onPress={() => Linking.openURL(url)}>
          <Text numberOfLines={3} style={styles.title}>{author}</Text>
        </TouchableOpacity>
        <Text style={styles.date}></Text>
      </View>

    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 180,
    height: 230,
    marginRight: 12,
    backgroundColor: "white",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
  },
  image: {
    flex: 1.5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  text: {
    flex: 1,
    padding: 6,
    gap: 3,
  },
  source: {
    fontSize: 13,
  },
  touchable: {

  },
  title: {
    fontWeight: "600",
  },
  date: {
    fontSize: 12,
    fontStyle: "italic",
    color: "gray"
  }
})
export default BookTile