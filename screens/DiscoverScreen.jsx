import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import useAxios from '../hooks/useAxios'
import SearchBar from '../components/SearchBar'
import SearchResults from '../components/SearchResults'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const DiscoverScreen = () => {

  const [bestSellers, setBestSellers] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [genreList, setGenreList] = useState([])
  const [genre, setGenre] = useState("")
  const [bestSellersByGenre, setBestSellersByGenre] = useState([])

  const { response: responseBestSellers } = useAxios({ url: "/nyt/bestsellers", method: "get" })
  const { setData: setSearchData, response: responseSearch } = useAxios({ url: "/bookhub/search", method: "get" })
  const { response: responseGenreList } = useAxios({ url: "/nyt/genres", method: "get" })
  const { setData: setGenreBestSellersData, response: responseGenreBestSellers } = useAxios({ url: `/nyt/genres/${genre}`, method: "get" })

  useEffect(() => {
    setBestSellersByGenre(responseGenreBestSellers)
  }, [responseGenreBestSellers])


  useEffect(() => {
    setGenreBestSellersData(genre)
  }, [genre])

  useEffect(() => {
    setBestSellers(responseBestSellers)
    setGenreList(responseGenreList)
  }, [responseBestSellers, responseGenreList])

  useEffect(() => {
    setSearchResults(responseSearch)
  }, [responseSearch])

  return (
    <ScrollView>

      <SearchBar onSubmit={setSearchData} placeholder="Search" buttonText="Search"/>
      {searchResults?.length > 0 && <SearchResults searchResults={searchResults}/>}

      <Text>New York Times Best Sellers</Text>

      <View style={styles.dropdown}>
        <SelectDropdown
          data={genreList}
          onSelect={(selectedItem, index) => setGenre(selectedItem)}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View style={styles.dropdownButtonStyle}>
                <Text style={styles.dropdownButtonTxtStyle}>
                  {genre || 'Select Genre:'}
                </Text>
                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'}  />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
              </View>
            );
          }}
        />
      </View>

      <View>
        {bestSellersByGenre?.length > 0 && <ScrollingList genre={genre} list={bestSellersByGenre}/>}
      </View>

      <View>
        {bestSellers?.map(item => <ScrollingList key={item.label} genre={item.label} list={item.books}/>)}
      </View>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    alignItems: "center",
  },
  dropdownButtonStyle: {
    width: 320,
    height: 34,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownButtonIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
})

export default DiscoverScreen