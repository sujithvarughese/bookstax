import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { TextField } from 'react-native-ui-lib'
import Button from './ui/Button'
import { useState } from 'react'
import { colors } from '../utils/styles'
import { FontAwesome5 } from '@expo/vector-icons'


const SearchBar = ({ onSubmit, placeholder, buttonText }) => {

  const [query, setQuery] = useState("")

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <TextField
          value={query}
          onChangeText={(input) => setQuery(input)}
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

      <Button onPress={() => onSubmit(query)}><Text>{buttonText}</Text></Button>

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
})
export default SearchBar