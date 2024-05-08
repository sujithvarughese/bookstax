import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native'
import useLists from '../hooks/useLists'
import { useAuthContext } from '../context/auth-context'
import { useEffect, useState } from 'react'
import BookTile from '../components/BookTile'
import useBooks from '../hooks/useBooks'
import connect from '../utils/connect'

const LibraryScreen = () => {

  const { userId } = useAuthContext()

  const [library, setLibrary] = useState([])

  const getLibrary = async () => {
    try {
      const response = await connect(`library/user/${userId}`)
      const { data } = response.data
      setLibrary(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLibrary()
  }, [])



  return (
    <ScrollView style={styles.container}>
      <Text>Library</Text>
      <View style={styles.content}>
        {library?.length > 0 ?
          library.map(book => <BookTile key={book.title} book={book}/>)
          :
          <Text>No books in library</Text>
        }
      </View>

    </ScrollView
    >
  )
}

const styles = StyleSheet.create({
  container: {

  },
  content: {
    paddingTop: 12,
    paddingHorizontal: 6,
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    alignItems: "center",


  }
})

export default LibraryScreen