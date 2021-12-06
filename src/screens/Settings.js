import React, {onPress} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, ImageBackground, Dimensions } from 'react-native';
import { Auth } from 'aws-amplify';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function Home({ navigation, updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }


  const goToReportData = () => {
    navigation.navigate('ReportData')
  }

  const goToGraphs = () => {
    navigation.navigate('Graphs')
  }

  return (

    <View style={{flex: 1, backgroundColor: 'black'}}>
    <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>
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
      PROFILE & SETTINGS</Text>
    <View style={{alignItems: 'center'}}>
      <View style={{height: 20}}></View>
    <View style={{ flexGrow: 1, width: 130, marginTop: 10, marginBottom: 10, paddingHorizontal: 10, borderRadius: 10, alignItems: 'center'}}>
    <TouchableOpacity
        color={'limegreen'}
        onPress={signOut}
        backgroundColor={'green'}
    >
        <View style={{backgroundColor: 'limegreen', height: 35, width: 150, alignItems: 'center', justifyContent: 'center', borderRadius: 10,}}>
        <Text style={{fontFamily: 'MontserratBold-DOWZd', color: 'black', fontSize: 15}}>SIGN OUT</Text>
        </View>
    </TouchableOpacity>
    </View>
    </View>

    
    </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  }
});