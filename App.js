import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Button,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Amplify from 'aws-amplify';
import config from './src/aws-exports';
Amplify.configure(config);

import { withAuthenticator } from 'aws-amplify-react-native';
// ... contents of App component
function App() {
    async function signOut() {
      try {
        await Auth.signOut();
      } catch (error) {
        console.log('Error signing out: ', error);
      }
    }
    return (
      <View>
        <Text> +  = React Native + Amplify </Text>
        <Button title="Sign Out" color="tomato" onPress={signOut} />
        <StatusBar style="auto" />
      </View>
    );
  }
// wrap the App component as shown below
export default withAuthenticator(App);