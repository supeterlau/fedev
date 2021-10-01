import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Amplify from 'aws-amplify'
import config from './src/aws-exports'

import { withAuthenticator } from 'aws-amplify-react-native'

Amplify.configure(config)

function App() {
  return (
    <View style={styles.container}>
      <Text>React Native + Amplify 🚀</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// true 是否启用 Sign Out 按钮
export default withAuthenticator(App, true)
