import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextField } from 'react-native-ui-lib'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { useEffect, useState } from 'react'
import ListSearch from '../components/ui/ListSearch'
import connect from '../utils/connect'
import useLists from '../hooks/useLists'
import BookTile from '../components/ui/BookTile'

const SearchScreen = () => {

  const { setData, lists } = useLists({ url: "discover/search"})

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(lists["searchResults"])
  }, [lists])

  return (
    <ScrollView>
      <Text>Search</Text>
      <ListSearch
        onSubmit={setData}
        placeholder="Search genre"
        buttonText="Search"
      />

      {searchResults?.map(item => {
        return (
          <BookTile title={item.title} author={item.author} coverImage={`https://covers.openlibrary.org/b/id/${item.coverID}-M.jpg`} />
        )
      })}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

})

export default SearchScreen