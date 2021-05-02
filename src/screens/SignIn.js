import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, Image } from 'react-native';
import { Auth } from 'aws-amplify';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../components/AppTextInput';
import AppButton from '../components/AppButton';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


export default function SignIn({ navigation, updateAuthState }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  async function signIn() {
    try {
      await Auth.signIn(username, password);
      console.log(' Success');
      updateAuthState('loggedIn');
    } catch (error) {
      console.log(' Error signing in...', error);
    }
  }
  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      {/* <ImageBackground source={'../assets/dnagebackground.jpg'} style={{width: windowWidth}}> */}
      
      <ImageBackground source={require('../assets/dna3.jpg')} imageStyle={{opacity:0.25}} style={{flex: 1, width: windowWidth, height: windowHeight, opacity: 20}}>


      <View style={{flex: 1, alignItems: 'center'}}>
      <View style={{height: 40}}></View>
        <Image source={require('../assets/myDNAgelogo2.png')} style={{flex: 1, resizeMode: 'contain', 
                                                                      transform: [{ scale: 0.68 }]
                                                                      }}/>
      </View>

      <View style={{flex: 2, alignItems: 'center'}}>
          <Text style={styles.title}>Sign in</Text>
            <AppTextInput
              value={username}
              onChangeText={text => setUsername(text)}
              leftIcon="account"
              placeholder="Enter username"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              fontSize={18}
              style={{width: '75%', fontFamily: 'MontserratRegular-BWBEl'}}

            />
            <AppTextInput
              value={password}
              onChangeText={text => setPassword(text)}
              leftIcon="lock"
              placeholder="Enter password"
              autoCapitalize="none"
              autoCorrect={false}
              secureTextEntry
              textContentType="password"
              fontSize={18}
              style={{width: '75%', fontFamily: 'MontserratRegular-BWBEl'}}

            />
            <AppButton title="Login" onPress={signIn} />
            <View style={styles.footerButtonContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.forgotPasswordButtonText}>
                  Don't have an account? Sign Up
                </Text>
              </TouchableOpacity>
            </View>

      </View>



      </ImageBackground>
      {/* </ImageBackground> */}
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
      safeAreaContainer: {
        flex: 1,
        backgroundColor: 'black'
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
      },
      backgroundImage: {
        //flex: 1,
        resizeMode: 'cover', // or 'stretch'
      }
    });