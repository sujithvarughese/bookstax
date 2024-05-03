import { ScrollView, StyleSheet, Text, View } from 'react-native'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'

const DiscoverScreen = () => {

  const [bestSellersList, setBestSellersList] = useState([])

  const fetchBestSellersList = async () => {
    try {
      const response = await connect("discover/bestsellers")
      const { bestSellersOverview } = response.data
      setBestSellersList(bestSellersOverview)
    } catch (error) {
      throw new Error(error)
    }
  }

  useEffect(() => {
    fetchBestSellersList()
  }, [])

  return (
    <ScrollView>
      <Text>Discover</Text>
      {bestSellersList?.map(item => {
        return (
          <ScrollingList genre={item.label} list={item.books}/>
        )
      })}
    </ScrollView>
  )
}

export default DiscoverScreen