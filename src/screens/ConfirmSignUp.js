import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { run } from 'jest-cli';





export default function ConfirmSignUp({ route, navigation }) {
  //let key = navigation.route.params.emailAd

  let uNameIn = 'default'

  getuName()

  function getuName(){
    try {
      let uName = route.params
      uNameIn = uName
      console.log("here")
      console.log(JSON.stringify(uNameIn))
      console.log(JSON.stringify(uName))
    }
    catch{
      console.log("noTitle")
    }
  }

  
  const [username, setUsername] = useState('');
  const [authCode, setAuthCode] = useState('');
  async function confirmSignUp() {
    try {
      await Auth.confirmSignUp(username, authCode);
      console.log(' Code confirmed');
      navigation.navigate('SignIn');
    } catch (error) {
      console.log(
        ' Verification code does not match. Please enter a valid verification code.',
        error.code
      );
    }
  }

  function backhome(){
    navigation.navigate('SignIn');
  
  }

  function run(){
    setUsername(uNameIn)
  }

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>{uNameIn}</Text>
        <Text style={styles.title}>Confirm Sign Up</Text>
        {/* <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        /> */}
        <AppTextInput
          value={authCode}
          onChangeText={text => {setAuthCode(text)
                        run() 
                      }}
          leftIcon="numeric"
          placeholder="Enter verification code"
          keyboardType="numeric"
        />
        <AppButton title="Confirm Sign Up" onPress={confirmSignUp} />
        <AppButton title="back home" onPress={backhome} />
        <Text>placeholder</Text>


      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    color: '#202020',
    fontWeight: '500',
    marginVertical: 15
  }
});