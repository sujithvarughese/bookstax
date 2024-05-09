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
import useAxios from '../hooks/useAxios'

const icons = {
  "Apple Books": <Fontisto name="apple" size={24} color="black" />,
  "Amazon": <Fontisto name="amazon" size={24} color="black" />
}

const BookDetails = ({ showModal, setShowModal, book }) => {
  // book only has property if in library
  if (book._id) {
    console.log(book)
  }
  // book -> nyt, bookhub, or db
  // bookDetails -> bookhub
  // myBookDetails -> db

  const { userId } = useAuthContext()

  const [bookDetails, setBookDetails] = useState({}) // api
  const [myBookDetails, setMyBookDetails] = useState(book) // db
  const [expandedSummary, setExpandedSummary] = useState(false)
  const [stars, setStars] = useState([])


  const id = book?.id || book?.bookId
  const { response } = useAxios({ url: `/bookhub/${id}`, method: "get" })



  const updateBookDetails = async () => {
    try {
      const response = await connect.patch(`/library/${book._id}`, myBookDetails)
      setMyBookDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const addBookToLibrary = async () => {
    setShowModal(false)
    try {
      const response = await connect.post("/library", { ...book, userId })
      setMyBookDetails(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const arr = []
    for (let i = 0; i < myBookDetails?.myRating; i++) {
      arr.push(<Ionicons name="star" size={24} color="black"/>)
    }
    for (let i = myBookDetails?.myRating; i < 5; i++) {
      arr.push(<Ionicons name="star-outline" size={24} color="black" />)
    }
    setStars(arr)
  }, [myBookDetails]);

  let loadCount = 0
  useEffect(() => {
    if (loadCount === 0) {
      loadCount++
      return
    }
    updateBookDetails(myBookDetails)
  }, [myBookDetails])

  useEffect(() => {
    setBookDetails(response)
  }, [response])

  return (
    <View style={styles.container}>
      <Modal visible={showModal}>

        <ScrollView style={styles.content}>
          <Fontisto style={styles.closeButton} onPress={() => setShowModal(false)} name="close-a" size={16} color="black" />

          <Image resizeMode="cover" style={styles.image} source={{ uri: book.image }} />
          <Text style={styles.title}>{bookDetails?.title}</Text>
          <Text style={styles.author}>{bookDetails?.author}</Text>

          {
            !book?.status &&
            <View style={styles.addButtonContainer}>
              <Text>Add to Library</Text>
              <TouchableOpacity
                style={styles.addButton}
                onPress={addBookToLibrary}>
                <Ionicons name="add-circle-sharp" size={28} color="black" />
              </TouchableOpacity>
            </View>
          }



          <View style={styles.columns}>
            <View style={styles.col1}>
              <Text style={styles.rating}>Rating: {bookDetails?.rating}</Text>
              <Text style={styles.pages}>{bookDetails?.pages} pages</Text>
              <Text style={styles.year}>Year released: {bookDetails?.year}</Text>
            </View>


            {myBookDetails?._id &&
            <View style={styles.col2}>
              <View style={styles.stars}>
                {stars.map((star, index) =>
                  <Icon
                    key={index}
                    onPress={()=> {
                      setMyBookDetails({ ...myBookDetails, myRating: index + 1 })
                    }}
                  >
                    {star}
                  </Icon>
                )}
              </View>

              <View style={styles.favorite}>
                {myBookDetails?.favorite ?
                  <Ionicons
                    onPress={() => setMyBookDetails({ ...myBookDetails, favorite: false })}
                    name="heart-sharp" size={24} color="black" />
                  :
                  <Ionicons
                    onPress={() => setMyBookDetails({ ...myBookDetails, favorite: true })}
                    name="heart-outline" size={24} color="black" />
                }
              </View>



              <View style={styles.status}>
                <SelectDropdown
                  data={[
                    { title: "Unread" },
                    { title: "Completed" },
                    { title: "Reading" }
                  ]}
                  onSelect={(selectedItem, index) => setMyBookDetails({ ...myBookDetails, status: selectedItem.title})}
                  renderButton={(selectedItem, isOpened) => {
                    return (
                      <View style={styles.dropdownButtonStyle}>
                        <Text style={styles.dropdownButtonTxtStyle}>
                          {myBookDetails.status || 'Status:'}
                        </Text>
                        <Icon name={isOpened ? 'chevron-up' : 'chevron-down'}  />
                      </View>
                    );
                  }}
                  renderItem={(item, index, isSelected) => {
                    return (
                      <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                        <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                      </View>
                    );
                  }}
                  showsVerticalScrollIndicator={false}
                  dropdownStyle={styles.dropdownMenuStyle}
                />
              </View>
            </View>
            }
          </View>

          <View style={styles.summary}>
            <Text style={styles.descriptionText}>Description</Text>
            {expandedSummary ?
              <Text>{bookDetails?.summary}</Text>
              :
              <Text numberOfLines={6} >{bookDetails?.summary}</Text>
            }
            <TouchableOpacity onPress={() => setExpandedSummary(!expandedSummary)}>
              <Text>{expandedSummary ? "Less" : "More"}</Text>
            </TouchableOpacity>
          </View>


          <View style={styles.genres}>
            {bookDetails?.genres?.map(genre => <View style={styles.genre}><Text style={styles.genreText}>{genre}</Text></View>)}
          </View>

          {
            book.buyLinks &&
              <View style={styles.buyLinks}>
                <TouchableOpacity style={styles.buyLink} onPress={() => Linking.openURL(book.buyLinks[0].url)}>
                  <Fontisto name="amazon" size={24} color="black" />
                  <Text>{book.buyLinks[0].name}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.buyLink} onPress={() => Linking.openURL(book.buyLinks[1].url)}>
                  <Fontisto name="apple" size={24} color="black" />
                  <Text>{book.buyLinks[1].name}</Text>
                </TouchableOpacity>
              </View>
          }


          {
            myBookDetails?._id &&
            <View style={styles.removeButtonContainer}>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => console.log("Delete not available in demo!")}>
                <Ionicons name="remove-circle" size={24} color="black" />
              </TouchableOpacity>
              <Text>Remove from Library</Text>
            </View>
          }

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
  content: {
    marginVertical: 60,
    marginHorizontal: 20,
    padding: 12,
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
  closeButton: {
    alignSelf: "flex-end"
  },
  addButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
  },
  image: {
    alignSelf: "center",
    borderRadius: 4,
    width: 240,
    height: 360,
  },
  title: {
    alignSelf: "center",
    fontSize: 18,
    fontWeight: "800"
  },
  author: {
    alignSelf: "center",
    fontSize: 16
  },
  columns: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12
  },
  col1: {
    justifyContent: "space-between"
  },
  col2: {
    justifyContent: "space-between",
    gap: 4,
  },
  rating: {

  },
  pages: {

  },
  year: {

  },
  button: {
    zIndex: 200
  },
  favorite: {
    alignSelf: "flex-end"
  },
  stars: {
    flexDirection: "row",
  },
  status: {
    alignItems: "center",
  },

  summary: {
    marginVertical: 12,
    alignSelf: "center",
    alignItems: "center",
    gap: 6
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "600"
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
  },
  genre: {
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "dodgerblue",
    borderRadius: 50,
  },
  buyLinks: {
    marginVertical: 12,
    flexDirection: "row",
    justifyContent: "space-around"
  },
  buyLink: {
    alignItems: "center",
  },
  removeButtonContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  removeButton: {

  },
  dropdownButtonStyle: {
    width: 120,
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
export default BookDetails