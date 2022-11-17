import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, Button, View, KeyboardAvoidingView, TextInput } from 'react-native'
import { Avatar, Text } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'
import { StatusBar } from 'expo-status-bar'

const SetBudgetLimit = ({navigation}) => {
    useLayoutEffect(() => {
      navigation.setOptions({
        title: 'RECEIPTIFY',
        headerStyle: { 
          backgroundColor: '#90BE6D',
        },
        headerTintColor: 'white',
      })
    }, [navigation])
    useLayoutEffect(() => {
      navigation.setOptions({
        headerBackTitle: 'Back',
      })
    }, [navigation])

    return (
        <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          keyboardType
          placeholder='Set new Budget Limit'
        //   value={shop}
        //   onChangeText={(text) => setShop(text)}
        />

        <Button
          containerStyle={styles.button}
          title='Add'
          //onPress={createExpense}
          //loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
      )
    }
    
export default SetBudgetLimit

    const styles = StyleSheet.create({
        container: {
          backgroundColor: 'white',
          flex: 1,
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          padding: 10,
        },
        profile: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        card: {
          backgroundColor: '#Fafafa',
          alignItems: 'center',
          width: '100%',
          padding: 5,
          borderRadius: 10,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.23,
          shadowRadius: 2.62,
          elevation: 4,
          marginVertical: 5,
          marginBottom: 15,
        },
        cardTop: {
          // backgroundColor: 'blue',
          marginBottom: 20,
        },
        cardBottom: {
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '100%',
          margin: 'auto',
          backgroundColor: '#fafafa',
          borderRadius: 5,
        },
        cardBottomSame: {
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        },
        recentTitle: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        },
        recentTransactions: {
          backgroundColor: 'white',
          width: '100%',
        },
        seeAll: {
          fontWeight: 'bold',
          color: 'green',
          fontSize: 16,
        },
        addButton: {
          position: 'absolute',
          bottom: 0,
          padding: 10,
          alignSelf: 'center',
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        buttonContainer: {
          flexDirection: 'column',
          alignItems: 'center',
        },
        plusButton: {
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 12,
          },
          shadowOpacity: 0.58,
          shadowRadius: 16.0,
          elevation: 24,
        },
        containerNull: {
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: '100%',
        },
      
        buttonStyle: {
          marginTop: 25,
          display: "flex",
          justifyContent: "center",
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 10,
          padding: 14,
          backgroundColor: '#97B973',
          borderRadius: 6,
        },
      
        textStyle: {
          color: 'white',
          textAlign: 'center',
          fontSize: 16,
        },
        
      })
      