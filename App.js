import 'react-native-gesture-handler';

import React, { useState, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import Amplify, { Auth } from 'aws-amplify';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import config from './src/aws-exports';
import SignIn from './src/screens/SignIn';
import SignUp from './src/screens/SignUp';
import ConfirmSignUp from './src/screens/ConfirmSignUp';


import Settings from './src/screens/Settings'
import Results from './src/screens/Results'
import PersonalTrends from './src/screens/PersonalTrends'
import Survey from './src/screens/Survey'
import CommunityTrends from './src/screens/CommunityTrends'
import Learning from './src/screens/Learning'

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';


import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'react-native';


Amplify.configure(config);

console.disableYellowBox = true;


const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

const TabStack = props => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: 'limegreen',
        inactiveTintColor: 'white',
        showIcon: true,
        showLabel: false,
        style: {
          //height:100,
          backgroundColor: 'black',
        },
        labelStyle: {
          textAlign: 'center',
          alignItems: 'center',
        },
        iconStyle: {
          alignItems: 'center',
          justifyContent: 'center',
          height: 50,
          //width: 20
          activeTintColor: 'limegreen'
        },
        indicatorStyle: {
          borderBottomColor: 'limegreen',
          borderBottomWidth: 4,
        },
      }}>


        
      <Tab.Screen
        name="Results"
        component={screenProps => (
          <Results {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'Results',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/Results2.png")} />
          ),
        }}  />


      <Tab.Screen
        name="PersonalTrends"
        component={screenProps => (
          <PersonalTrends {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'PersonalTrends',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/PersonalTrends2.png")} />
          ),
        }} />


      <Tab.Screen
        name="Survey"
        component={screenProps => (
          <Survey {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'Survey',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/Survey2.png")} />
          ),
        }} />


      <Tab.Screen
        name="CommunityTrends"
        component={screenProps => (
          <CommunityTrends {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'CommunityTrends',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/CommunityTrends2.png")} />
          ),
        }} />


      <Tab.Screen
        name="Learning"
        component={screenProps => (
          <Learning {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'Learning',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/Learning2.png")} />
          ),
        }} />


      <Tab.Screen
        name="Settings"
        component={screenProps => (
          <Settings {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Image style={{tintColor: color, width: 50, height: 50}} source={require("./src/assets/Settings2.png")} />
          ),
        }} />

    </Tab.Navigator>
  );
}



const AuthenticationNavigator = props => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="SignIn">
        {screenProps => (
          <SignIn {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AuthenticationStack.Screen>
      <AuthenticationStack.Screen name="SignUp" component={SignUp} />
      <AuthenticationStack.Screen
        name="ConfirmSignUp"
        component={ConfirmSignUp}
      />
    </AuthenticationStack.Navigator>
  );
};


const AppNavigator = props => {
  return (
    <AppStack.Navigator
    initialRouteName="Settings"
    headerMode="none"
    screenOptions={{
      headerStyle: { backgroundColor: '#633689' },
      headerTintColor: '#fff',
      headerTitleStyle: { fontWeight: 'bold' }}}>

      <AppStack.Screen
        name="TabStack"
        component={screenProps => (
          <TabStack {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        options={{ title: 'Tab Stack' }}
      />

    </AppStack.Navigator>
  );
};


const Initializing = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="tomato" />
      </View>
    );
};


  function App() {
    const [isUserLoggedIn, setUserLoggedIn] = useState('initializing');

    useEffect(() => {
      checkAuthState();
    }, []);
    async function checkAuthState() {
      try {
        await Auth.currentAuthenticatedUser();
        console.log(' User is signed in');
        setUserLoggedIn('loggedIn');
      } catch (err) {
        console.log(' User is not signed in');
        setUserLoggedIn('loggedOut');
      }
    }
    function updateAuthState(isUserLoggedIn) {
      setUserLoggedIn(isUserLoggedIn);
    }


    return (
      <NavigationContainer>
        {isUserLoggedIn === 'initializing' && <Initializing />}
        {isUserLoggedIn === 'loggedIn' && (
          <AppNavigator updateAuthState={updateAuthState} />
        )}
        {isUserLoggedIn === 'loggedOut' && (
          <AuthenticationNavigator updateAuthState={updateAuthState} />
        )}
      </NavigationContainer>
    );

  }


  export default App;