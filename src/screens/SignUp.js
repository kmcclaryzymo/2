import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';
import { run } from 'jest-cli';
import { CognitoUserPool } from 'amazon-cognito-identity-js';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SignUp({ navigation }) {

  let uName = ''


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  async function signUp() {
    try {
      await Auth.signUp({ username, password, attributes: { email } });
      console.log(' Sign-up Confirmed');
      console.log(uName)
      console.log(username)
      navigation.navigate('ConfirmSignUp', username);
    } catch (error) {
      console.log(' Error signing up...', error);
    }
  }

  function run(text){
    text => setEmail(text)
    uName = text
    console.log("a")
    console.log(text)
    console.log("abc " + uName)
  }

  let emailAd = ""

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>



      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{height: 40}}></View>
        <Image source={require('../assets/myDNAgelogo2.png')} style={{flex: 1, resizeMode: 'contain', 
                                                                      transform: [{ scale: 0.68 }]
                                                                      }}/>
      </View>


      <View style={{flex: 2, alignItems: 'center'}}>
      <Text style={styles.title}>Sign up</Text>
        <AppTextInput
          value={username}
          onChangeText={text => {setUsername(text)
                                  run(text)
                                  console.log(text)}}

          leftIcon="account"
          placeholder="Create username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        />
        <AppTextInput
          value={password}
          onChangeText={text => {setPassword(text)}}
          leftIcon="lock"
          placeholder="Create password"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          textContentType="password"
        />
        {/* <AppTextInput
          value={email}
          onChangeText={text => setEmail(text)}
          leftIcon="email"
          placeholder="Enter email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
        /> */}
        <AppButton title="Sign Up" onPress={signUp} />
        <View style={styles.footerButtonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.forgotPasswordButtonText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>
        </View>

      </View>



      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
      safeAreaContainer: {
        flex: 1,
        backgroundColor: 'black'
      },
      container: {
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'center'
      },
      heading: {
        fontSize: 60,
        color: 'limegreen',
        marginVertical: 15,
        fontFamily: 'MontserratBold-DOWZd',
      },
      title: {
        fontSize: 20,
        color: '#F6D501',
        fontWeight: '500',
        marginVertical: 15,
        fontFamily: 'MontserratBold-DOWZd'
      },
      footerButtonContainer: {
        marginVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
      },
      forgotPasswordButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600'
      }
    });