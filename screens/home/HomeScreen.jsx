import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import logo from "../../assets/logo.jpeg"
import { colors } from '../../utils/styles'
import connect from '../../utils/connect'
import { useEffect, useState } from 'react'
import BookTile from '../../components/BookTile'
import ScrollingList from '../../components/ui/ScrollingList'

const HomeScreen = () => {

  const [currentlyReading, setCurrentlyReading] = useState([])

  const getCurrentlyReading = async () => {
    try {
      const response = await connect(`library/user/current/${userId}`)
      const { data } = response.data
      setCurrentlyReading(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getCurrentlyReading()
  }, [])

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
        {currentlyReading?.length > 0 && <ScrollingList genre="Continue Reading" list={currentlyReading} />}

      </View>
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