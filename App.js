import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { LogBox } from 'react-native';

// pages
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import AddScreen from './screens/AddScreen'
import UpdateScreen from './screens/UpdateScreen'
import AllTransactions from './screens/AllTransactions'
import QRCode from './screens/QRCode'
import SetBudgetLimit from './screens/SetBudgetLimit'
import ProfilePicScreen from './screens/ProfilePicScreen'
import BudgetScreen from './screens/BudgetScreen'
import { Button } from 'react-native-elements'


const Stack = createStackNavigator()

LogBox.ignoreLogs(['AsyncStorage has been extracted from react-native core and will be removed in a future release.']);
//LogBox.ignoreAllLogs();

export default function App() {
  const globalScreenOptions = {
    headerStyle: {
      backgroundColor: '#97B973',
      // backgroundColor: '#51A3B1',
    },
    headerTitleStyle: {
      color: '#000000',
    },
    headerTintColor: 'black',
  }
  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      <Stack.Navigator screenOptions={globalScreenOptions}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Add' component={AddScreen} />
        <Stack.Screen name='Update' component={UpdateScreen} />
        <Stack.Screen name='All' component={AllTransactions} />
        <Stack.Screen name='Scan' component={QRCode} />
        <Stack.Screen name='Set Profile Picture' component={ProfilePicScreen} />
        <Stack.Screen name='Budget' component={BudgetScreen} />
        <Stack.Screen name='SetLimit' component={SetBudgetLimit} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
