import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import BookDetails from './BookDetails'
import { useState } from 'react'
import connect from '../utils/connect'
const BookTile = ({ book }) => {

  const [showModal, setShowModal] = useState(false)

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.touchable} onPress={() => setShowModal(!showModal)}>
          <Image resizeMode="cover" style={styles.image} source={{ uri: book.image }} />
      </TouchableOpacity>
      {showModal &&
        <BookDetails
          showModal={showModal}
          setShowModal={setShowModal}
          book={book}
        />}

    </View>
  )
}
const styles = StyleSheet.create({
  container: {

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
    borderRadius: 4,
    width: 85,
    height: 140,
  },
  touchable: {
  zIndex: 0
  },
})
export default BookTile