import { ScrollView, Text } from 'react-native'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import useAxios from '../hooks/useAxios'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'

const DiscoverScreen = () => {

  const { response: responseBestSellers } = useAxios({ url: "/nyt/bestsellers", method: "get" })
  const { setData, response: responseSearch } = useAxios({ url: "/bookhub/search", method: "get" })

  const [bestSellers, setBestSellers] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    setBestSellers(responseBestSellers)
  }, [responseBestSellers])

  useEffect(() => {
    setSearchResults(responseSearch)
  }, [responseSearch])

  return (
    <ScrollView>

      <SearchBar onSubmit={setData} placeholder="Search" buttonText="Search"/>
      {searchResults?.length > 0 && <SearchResults searchResults={searchResults}/>}

      <Text>Discover</Text>
      {bestSellers?.map(item => {
        return (
          <ScrollingList key={item.label} genre={item.label} list={item.books}/>
        )
      })}
    </ScrollView>
  )
}

export default DiscoverScreen