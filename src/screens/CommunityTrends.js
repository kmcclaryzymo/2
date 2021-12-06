import React from 'react';
import { View, StyleSheet, Text, Image, Dimensions, ScrollView, ImageBackground, SafeAreaView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
function CommunityTrends() {
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
    <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight}}>

    <ScrollView>
      <LinearGradient
      //colors={['#100D1F', '#191628', '#232030', '#14141f', '#061419']}
      colors={['rgba(8, 9, 17, .3)', 'rgba(8, 9, 17, .2)', '#14141f', '#061419', 'black']}
      //style={{flex: 1}}
      >
            <Text 
          style={{
              color: "white", 
              height: 60, 
              textAlign: 'left', 
              textAlignVertical: 'center', 
              fontSize: 20, 
              fontWeight: 'bold',
              paddingLeft: 20,
              //textDecorationLine: 'underline'
          }}>
      COMMUNITY TRENDS</Text>
      <View style={{height: 10}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent2.png')} />
      </View>
      <View style={{height: 30}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent3.png')} />
      </View>
      <View style={{height: 30}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent1.png')} />
      </View>
      <View style={{height: 30}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent2.png')} />
      </View>
      <View style={{height: 30}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent3.png')} />
      </View>
      <View style={{height: 30}}></View>
      <View style={styles.tileContainer}>
        <Image style={styles.image} source={require('../assets/CommunityTrendsContent1.png')} />
      </View>
    </LinearGradient>
    </ScrollView>
    </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'black'
  },
  tileContainer: {
    //flex: 1,
    alignSelf: 'center',
    backgroundColor: 'rgba(30, 30, 30, 1)',
    height: 300,
    width: windowWidth -80,
    borderRadius:20,
    borderWidth: 1,
    shadowColor: "gold",
    shadowOffset: {
        width: 4,
        height: 4,
    },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 5, 
    borderColor: 'rgba(246, 213, 1, .1)',

    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
},
  image: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    resizeMode: 'contain',
    justifyContent: 'center',
    maxWidth: windowWidth - 20,
    height: 200,
    // width: 300,
    borderRadius:20,
    borderWidth: 1,
    //borderColor: 'gray',
},
})
export default CommunityTrends;