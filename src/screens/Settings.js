import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';


export default function Settings({ route, navigation, updateAuthState }) {
  async function signOut() {
    try {
      await Auth.signOut();
      updateAuthState('loggedOut');
    } catch (error) {
      console.log('Error signing out: ', error);
    }
  }

  let stringTitle = 'default'

  getText()

  function getText(){
    try {
      let title = route.params
      stringTitle = title.title
    }
    catch{
      console.log("noTitle")
    }
  }



  // let title = route.params
  // console.log(title)



  const goToReportData = () => {
    navigation.navigate('ReportData')
  }

  const goToGraphs = () => {
    navigation.navigate('Graphs')
  }

  return (

    <View style={styles.container}>
      <Text>  + aaaa {stringTitle}</Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <Button title="Report Data" color="dodgerblue" onPress={goToReportData}/>
      <Button title="Graphs" color="gold" onPress={goToGraphs}/>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20
  }
});