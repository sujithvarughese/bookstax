import { ScrollView, StyleSheet, Text, View } from 'react-native'
import connect from '../utils/connect'
import { useEffect, useState } from 'react'
import ScrollingList from '../components/ui/ScrollingList'
import useLists from '../useLists'

const DiscoverScreen = () => {



  const { getLists, lists } = useLists({ preload: true, uri: "discover/bestsellers" })


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