import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Auth } from 'aws-amplify';


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

  return (

    <View style={styles.container}>
      <Text>  + aaaa</Text>
      <Button title="Sign Out" color="tomato" onPress={signOut} />
      <Button title="Report Data" color="dodgerblue" onPress={goToReportData}/>
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