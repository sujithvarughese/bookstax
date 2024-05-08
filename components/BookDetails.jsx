import { Image, Modal, Linking, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Button from './ui/Button'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../context/auth-context'
import Fontisto from '@expo/vector-icons/Fontisto';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

const icons = {
  "Apple Books": <Fontisto name="apple" size={24} color="black" />,
  "Amazon": <Fontisto name="amazon" size={24} color="black" />
}

const BookDetails = ({ showModal, setShowModal, book }) => {

  const [bookDetails, setBookDetails] = useState({})
  const [expandedSummary, setExpandedSummary] = useState(false)
  const [stars, setStars] = useState([])
  const [bookState, setBookState] = useState(book)

  const { userId } = useAuthContext()

  const getBookDetails = async () => {
    try {
      const response = await connect(`library/${book.bookId}`)
      const { data } = response.data
      setBookDetails(data)
    } catch (error) {
      console.log(error)
    }
  }

  const updateBookDetails = async () => {
    try {
      const response = await connect.patch(`library/${book._id}`, book)
      const { data } = response.data
      setBookState(data)
    } catch (error) {
      console.log(error)
    }
  }

  const addBookToLibrary = async () => {
    try {
      const response = await connect.post("library", { ...book, userId })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const arr = []
    for (let i = 0; i < book?.myRating; i++) {
      arr.push(<Ionicons name="star" size={24} color="black"/>)
    }
    for (let i = book?.myRating; i < 5; i++) {
      arr.push(<Ionicons name="star-outline" size={24} color="black" />)
    }
    setStars(arr)
  }, [bookState]);


  useEffect(() => {
    getBookDetails()
  }, [])

  return (
    <View style={styles.container}>
      <Modal visible={showModal}>
        <ScrollView style={styles.modal}>
          <Image resizeMode="cover" style={styles.image} source={{ uri: book.image }} />
          <Text>{bookDetails?.title}</Text>
          <Text>{bookDetails?.author}</Text>
          <Text>Rating: {bookDetails?.rating}</Text>
          <Text>{bookDetails?.pages} pages</Text>
          <Text>Year released: {bookDetails?.year}</Text>
          <View>
            {expandedSummary ?
              <Text>{bookDetails?.summary}</Text>
              :
              <Text numberOfLines={6} >{bookDetails?.summary}</Text>
            }
            <TouchableOpacity onPress={() => setExpandedSummary(!expandedSummary)}>
              <Text>{expandedSummary ? "Less" : "More"}</Text>
            </TouchableOpacity>
          </View>

          <View>
            {
              stars.map((star, index) =>
                <Icon
                  key={index}
                  onPress={()=> {
                    updateBookDetails({ ...bookState, myRating: index + 1 })
                  }}
                >
                  {star}
                </Icon>
              )

            }
          </View>

          <View>
            <SelectDropdown
              data={[
                { title: "Unread" },
                { title: "Completed" },
                { title: "Reading" }
              ]}
              onSelect={(selectedItem, index) => console.log(selectedItem, index)}
              renderButton={(selectedItem, isOpened) => {
                return (
                  <View style={styles.dropdownButtonStyle}>
                    {selectedItem && (
                      <Icon name={selectedItem.icon}  />
                    )}
                    <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'Select status'}
                    </Text>
                    <Icon name={isOpened ? 'chevron-up' : 'chevron-down'}  />
                  </View>
                );
              }}
              renderItem={(item, index, isSelected) => {
                return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                    <Icon name={item.icon}  />
                    <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                  </View>
                );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
            />
          </View>




          <View>
            {bookDetails?.genres?.map(genre => <Text>{genre}</Text>)}
          </View>

          {
            book.buyLinks ?
              <View>
                <TouchableOpacity onPress={() => Linking.openURL(book.buyLinks[0].url)}>
                  <Fontisto name="amazon" size={24} color="black" />
                  <Text>{book.buyLinks[0].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => Linking.openURL(book.buyLinks[1].url)}>
                  <Fontisto name="apple" size={24} color="black" />
                  <Text>{book.buyLinks[1].name}</Text>
                </TouchableOpacity>
              </View>
              :
              <Button onPress={addBookToLibrary}><Text>Add to Library</Text></Button>

          }

          <Button onPress={()=>setShowModal(false)}><Text>Close</Text></Button>
        </ScrollView>

      </Modal>
    </View>



  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modal: {
    margin: 20,
    padding: 35,

    backgroundColor: "#F8F8F8",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    borderRadius: 10,
    zIndex: 100,
  },
  image: {
    borderRadius: 4,
    width: 85,
    height: 140,
  },
  button: {
    zIndex: 200
  },
  dropdownButtonStyle: {
    width: 200,
    height: 50,
    backgroundColor: '#E9ECEF',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
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
export default BookDetails