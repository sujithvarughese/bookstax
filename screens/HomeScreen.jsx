import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import logo from "../assets/logo.jpeg"
import { colors } from '../utils/styles'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import { useAuthContext } from '../context/auth-context'
import useAxios from '../hooks/useAxios'

const HomeScreen = () => {

  const [currentlyReading, setCurrentlyReading] = useState([])
  const [recommendedBooks, setRecommendedBooks] = useState([])
  const [bestSellers, setBestSellers] = useState([])

  const { userId } = useAuthContext()
  const { response: resCurrentlyReading } = useAxios({ url:`/library/current/${userId}`, method: "get" })
  const { response: resRecommendedBooks, setData } = useAxios({ url:`/bookhub/recommended`, method: "get" })
  const { response: resBestSellers, setBestSellersData } = useAxios({ url:`/nyt/bestsellers`, method: "get" })

  useEffect(() => {
    if (resBestSellers?.length > 0) {
      setBestSellers(resBestSellers[0].books)
    }
  }, [resBestSellers])

  useEffect(() => {
    setRecommendedBooks(resRecommendedBooks)
  }, [resRecommendedBooks])

  useEffect(() => {
    if (currentlyReading?.length > 0) {
      setData(currentlyReading[0].bookId)
    }
  }, [currentlyReading])

  useEffect(() => {
    setCurrentlyReading(resCurrentlyReading)
  }, [resCurrentlyReading, userId])

  return (
    <ScrollView style={styles.container}>
      <Text>Home</Text>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
        <View style={styles.logo}>
          <Text style={styles.med}>Book</Text>
          <Text style={styles.scope}>Stax</Text>
          <Image style={styles.image} source={logo} alt="logo"/>
        </View>
      </View>

      <View style={styles.content}>
        {currentlyReading?.length > 0 ?
          <ScrollingList genre="Continue Reading" list={currentlyReading} />
          :
          <Text>No books in your current reading.</Text>
        }
      </View>

      {recommendedBooks?.length > 0 &&
      <View style={styles.content}>
        <ScrollingList genre="Based on your reading" list={recommendedBooks} />
      </View>
      }
      {bestSellers?.length > 0 &&
      <View style={styles.content}>
        <ScrollingList genre="New York Times Best Sellers" list={bestSellers} />
      </View>
      }

    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  content: {

  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.colorGray
  },
  logo: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 2,
    paddingBottom: 12,
  },
  med: {
    color: colors.colorGray,
    fontSize: 20,
    fontWeight: "600"
  },
  scope: {
    color: colors.color,
    fontSize: 20,
    fontWeight: "600"
  },
  image: {
    width: 30,
    height: 30
  },
})
export default HomeScreen