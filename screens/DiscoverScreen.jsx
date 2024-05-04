import { ScrollView, StyleSheet, Text, View } from 'react-native'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import useLists from '../hooks/useLists'

const DiscoverScreen = () => {



  const { lists } = useLists({ url: "discover/bestsellers", method: "get" })


  return (
    <ScrollView>
      <Text>Discover</Text>
      {lists?.map(item => {
        return (
          <ScrollingList genre={item.label} list={item.books}/>
        )
      })}
    </ScrollView>
  )
}

export default DiscoverScreen