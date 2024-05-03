import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { useEffect, useState } from 'react'
import { FontAwesome5, Ionicons } from '@expo/vector-icons'
import Button from './ui/Button'
import LoadingOverlay from './ui/LoadingOverlay'
import { colors } from '../utils/styles'
import { TextField } from 'react-native-ui-lib'

const ListSearch = ({ list, placeholder, buttonText, onChange, onClick, onSubmit }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [queryMatches, setQueryMatches] = useState([])
  const [selectedItems, setSelectedItems] = useState([])
  const [listShown, setListShown] = useState(false)

  const handleChangeText = async () => {
    try {
      const results = await onChange(searchQuery)
      setQueryMatches(results)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    if (searchQuery.length === 0) {
      setListShown(false)
      setQueryMatches(list)
      console.log("1")
      return
    }
    setListShown(true)
    if (onChange) {
      handleChangeText()
      console.log("2")
    }
    if (list) {
      setTimeout(() => {
        if (searchQuery.length > 2) {
          const filteredMatches = list.filter(match => {
            return match.toLowerCase().includes(searchQuery.toLowerCase())
          })
          setQueryMatches(filteredMatches)
        }
        console.log("3")
      }, 100)
    }
  }, [searchQuery])

  const toggleListItem = (item) => {
    setSearchQuery("")
    setListShown(false)
    if (onClick) {
      onClick(item)
      return
    }
    if (selectedItems.length >= 5 && !selectedItems.includes(item)) {
      console.log("5 meds max")
      return
    }
    if (!selectedItems.includes(item)) {
      const updatedSelectedItems = [...selectedItems, item]
      setSelectedItems(updatedSelectedItems)
    } else {
      const updatedSelectedItems = selectedItems.filter(selected => selected !== item)
      setSelectedItems(updatedSelectedItems)
    }
  }

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
            onPress={() => toggleListItem(item)}
          >
            <Text style={styles.listItemText} numberOfLines={1}>{item}</Text>
            {selectedItems?.includes(item) &&
              <Ionicons name="checkmark" size={20} color="red" />}
          </Pressable>
        }
      />
      }
      {!listShown && selectedItems.length > 0 &&
      <View style={styles.selectedListContainer}>
        <View style={styles.selectedList}>
          {selectedItems.map(item =>
            <View style={styles.selectedItem}>
              <Text style={styles.selectedItemText} numberOfLines={1}>{item}</Text>
              <Pressable onPress={() => toggleListItem(item)}>
                <Ionicons name="remove-circle-sharp" size={20} color="red" />
              </Pressable>
            </View>)}
        </View>
        {
          buttonText &&
          <View>
            <Button onPress={() => onSubmit(selectedItems)}><Text>{buttonText}</Text></Button>
          </View>
        }
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