import { FlatList, StyleSheet, Text, View } from 'react-native'
import useLists from '../hooks/useLists'
import { useAuthContext } from '../context/auth-context'
import { useEffect, useState } from 'react'
import BookTile from '../components/ui/BookTile'

const LibraryScreen = () => {

  const { userId } = useAuthContext()

  const { lists, setData } = useLists({ url: "library" })

  const [library, setLibrary] = useState([])


  useEffect(() => {
    setData({ userId })
  }, [])

  useEffect(() => {
    setLibrary(lists["library"])
  }, [lists])

  return (
    <View>
      <Text>Library</Text>
      {library?.length > 0 ?
        <FlatList data={library} renderItem={({ item  }) => <BookTile />} />
        :
        <Text>No books in library</Text>
      }
    </View
    >
  )
}

export default LibraryScreen