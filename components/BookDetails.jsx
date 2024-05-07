import { Image, Modal, Linking, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Button from './ui/Button'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'


const BookDetails = ({ showModal, setShowModal, book }) => {

  const [bookDetails, setBookDetails] = useState({})

  const getBookDetails = async () => {
    try {
      const response = await connect(`library/${book.id}`)
      const { data } = response.data
      setBookDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getBookDetails()
  }, [bookDetails])

  return (
    <View style={styles.container}>
      <Modal visible={showModal}>
        <ScrollView style={styles.modal}>
          <Image resizeMode="cover" style={styles.image} source={{ uri: book.image }} />
          <Text>{bookDetails?.title}</Text>
          <Text>{bookDetails?.author}</Text>
          <Text>{bookDetails?.rating}</Text>
          <Text>{bookDetails?.pages} pages</Text>
          <Text>Year released: {bookDetails?.year}</Text>
          <Text>{bookDetails.summary}</Text>
          <View>
            {bookDetails.genres?.map(genre => <Text>{genre}</Text>)}
          </View>

          <Button onPress={()=>setShowModal(false)}><Text>Close</Text></Button>
        </ScrollView>

      </Modal>
    </View>



  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    margin: 20,
    padding: 35,

    backgroundColor: "#F8F8F8",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    zIndex: 100,
  },
  image: {
    borderRadius: 4,
    width: 85,
    height: 140,
  },
  button: {
    zIndex: 200
  }
})
export default BookDetails