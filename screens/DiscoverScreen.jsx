import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import useAxios from '../hooks/useAxios'
import SearchBar from '../components/SearchBar'
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import BookList from '../components/BookList'
import { colors } from '../utils/styles'

const DiscoverScreen = () => {

  const { response: bestSellers } = useAxios({ url: "/nyt/bestsellers", method: "get" })
  const { response: genreList } = useAxios({ url: "/nyt/genres", method: "get" })

  const { setData: setSearch, response: searchResults } = useAxios({ url: "/bookhub/search", method: "get" })
  const { data: genre, setData: setGenre, response: genreBestSellers } = useAxios({ url: `/nyt/genres/${genre}`, method: "get" })


  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <SearchBar onSubmit={setSearch} placeholder="Search" buttonText="Search"/>
        {searchResults?.length > 0 && <BookList title="Search Results" list={searchResults}/>}

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

        {genreBestSellers?.length > 0 &&
          <View>
            <ScrollingList genre={genre} list={genreBestSellers}/>
          </View>
        }

        {bestSellers?.length > 0 &&
          <View>
            {bestSellers?.map(item => <ScrollingList key={item.label} genre={item.label} list={item["books"]}/>)}
          </View>
        }
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background
  },
  content: {
    paddingTop: 12,
    paddingHorizontal: 6,
    gap: 6,
    alignItems: "center",
  },
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