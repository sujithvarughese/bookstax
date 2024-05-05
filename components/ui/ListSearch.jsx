import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import Button from './Button'
import LoadingOverlay from './LoadingOverlay'
import { colors } from '../../utils/styles'
import { TextField } from 'react-native-ui-lib'

const ListSearch = ({ list, placeholder, buttonText, onChange, onClick, onSubmit }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [queryMatches, setQueryMatches] = useState([])
  const [listShown, setListShown] = useState(false)

  useEffect(() => {
    if (list) {
      const filteredMatches = list.filter(match => {
        return match.toLowerCase().includes(searchQuery.toLowerCase())
      })
      setQueryMatches(filteredMatches)
    }
  }, [searchQuery])

  if (isLoading) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>

      <View style={styles.searchBar}>
        <TextField
          value={searchQuery}
          onChangeText={(query) => setSearchQuery(query)}
          returnKeyType="search"
          placeholder={placeholder || "Search"}
          dense={true}
          clearButtonMode='always'
          autoCapitalize="none"
        />

        <View style={styles.searchIcon}>
          <FontAwesome5 name="search" size={16} color="red" />
        </View>
      </View>

      {listShown &&
      <FlatList
        style={styles.list}
        data={queryMatches}
        keyExtractor={item => item}
        renderItem={({ item }) =>
          <Pressable
            style={styles.listItem}
            onPress={() => onSubmit(item)}
          >
            <Text style={styles.listItemText} numberOfLines={1}>{item}</Text>

          </Pressable>
        }
      />
      }

      {buttonText &&
        <View>
          <Button onPress={(query) => onSubmit(query)}><Text>{buttonText}</Text></Button>
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "100%",
    padding: 12
  },
  searchBar: {
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 28,
    paddingRight: 12,
    paddingVertical: 6,
    width: "96%",
    justifyContent: "center",
    margin: 12,
    height: 42,
  },
  searchIcon: {
    position: "absolute",
    paddingHorizontal: 6,
    alignSelf: "flex-start",
  },
  selectedListContainer: {
    width: 300,
    backgroundColor: colors.colorGray,
    padding: 20,
    borderRadius: 6,
    alignItems: "center",
    gap: 12
  },
  selectedList: {
    width: "100%",
    gap: 6,
  },
  selectedItem: {
    backgroundColor: colors.colorLight,
    padding: 4,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  selectedItemText: {
    maxWidth: "90%"
  },
  list: {
    width: "100%"
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderBottomColor: "#E8E8E8",
    borderBottomWidth: 1,
  },
  listItemText: {
    fontSize: 20,
    maxWidth: "90%",
    textTransform: "capitalize",
  }
})
export default ListSearch