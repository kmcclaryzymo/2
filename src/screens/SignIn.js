import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, ImageBackground } from 'react-native';
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
        <View  style={styles.container}>
        <Text style={styles.heading}>myDNAge</Text>
        <Text style={styles.title}>Sign in to your account</Text>
        <AppTextInput
          value={username}
          onChangeText={text => setUsername(text)}
          leftIcon="account"
          placeholder="Enter username"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          fontSize={20}
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
          fontSize={20}
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
      container: {
        flex: 1,
        alignItems: 'center'
      },
      heading: {
        fontSize: 50,
        color: 'white',
        marginVertical: 15,
        fontFamily: 'MontserratBold-DOWZd',
      },
      title: {
        fontSize: 20,
        color: 'fuchsia',
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
        color: 'fuchsia',
        fontSize: 18,
        fontWeight: '600'
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
      }
    });