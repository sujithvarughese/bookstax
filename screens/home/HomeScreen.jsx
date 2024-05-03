import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import logo from "../../assets/logo.jpeg"
import { colors } from '../../utils/styles'

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome!</Text>
        </View>
        <View style={styles.logo}>
          <Text style={styles.med}>Med</Text>
          <Text style={styles.scope}>Scope</Text>
          <Image style={styles.image} source={logo} alt="logo"/>
        </View>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    padding: 8,
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