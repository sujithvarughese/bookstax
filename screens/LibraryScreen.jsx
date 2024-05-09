import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useAuthContext } from '../context/auth-context'
import { useEffect, useState } from 'react'
import BookTile from '../components/BookTile'
import useAxios from '../hooks/useAxios'

const LibraryScreen = () => {

  const { userId } = useAuthContext()
  const { response } = useAxios({ url: `/library/${userId}`, method: "get" })

  const [library, setLibrary] = useState([])

  useEffect(() => {
    setLibrary(response)
  }, [response])


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