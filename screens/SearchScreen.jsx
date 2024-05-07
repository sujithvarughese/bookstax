import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TextField } from 'react-native-ui-lib'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import LoadingOverlay from '../components/ui/LoadingOverlay'
import { useEffect, useState } from 'react'
import ListSearch from '../components/ui/ListSearch'
import connect from '../utils/connect'
import useLists from '../hooks/useLists'
import BookTile from '../components/BookTile'
import useBooks from '../hooks/useBooks'
import SearchBar from '../components/SearchBar'
import { useAuthContext } from '../context/auth-context'
import SearchResults from '../components/SearchResults'

const SearchScreen = () => {

  const { setData, books } = useBooks({ url: "discover/search"})

  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setSearchResults(books)
  }, [books])

  return (
    <ScrollView>
      <Text>Search</Text>

      <SearchBar onSubmit={setData} placeholder="Search" buttonText="Search"/>

      {searchResults?.length > 0 && <SearchResults searchResults={searchResults}/>}

    </ScrollView>
  )
}

const styles = StyleSheet.create({

})

export default SearchScreen