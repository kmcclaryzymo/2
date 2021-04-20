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
import Home from './src/screens/Home';

import ReportData from './src/screens/ReportData';
import Graphs from './src/screens/Graphs';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import
  MaterialCommunityIcons
from 'react-native-vector-icons/MaterialCommunityIcons';

import { Image } from 'react-native';

import FirstPage from './src/screens/tabs/FirstPage';
import SecondPage from './src/screens/tabs/SecondPage';
Amplify.configure(config);


const AuthenticationStack = createStackNavigator();
const AppStack = createStackNavigator();

const Tab = createMaterialTopTabNavigator();

const TabStack = props => {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        inactiveTintColor: '#F8F8F8',
        showIcon: true,
        style: {
          backgroundColor: '#633689',
        },
        labelStyle: {
          textAlign: 'center',
        },
        indicatorStyle: {
          borderBottomColor: '#87B56A',
          borderBottomWidth: 2,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
        
        options={{
          tabBarLabel: 'Home12',
          tabBarIcon: ({ color, size }) => (
            <Image 
            //resizeMode="contain"
            //style={styles.logo}
            source={require("./src/assets/favicon.png")} />
          ),
        }}  >

        {/* {screenProps => (<Home {...screenProps} updateAuthState={props.updateAuthState} />)}   */}

      </Tab.Screen>
      <Tab.Screen
        name="SecondPage"
        component={SecondPage}
        options={{
          tabBarLabel: 'Setting',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
                name="settings"
                color={color}
                size={size}
              />
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

 

      <AppStack.Screen name="Home">
        {screenProps => (
          <Home {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>

      <AppStack.Screen name="ReportData">
        {screenProps => (
          <ReportData {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>

      <AppStack.Screen name="Graphs">
        {screenProps => (
          <Graphs {...screenProps} updateAuthState={props.updateAuthState} />
        )}
      </AppStack.Screen>

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