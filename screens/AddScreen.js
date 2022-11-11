import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import { StatusBar } from 'expo-status-bar'
import firebase from 'firebase'
import React, { useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { auth, db } from '../firebase'

/*
This page is to be modified into Scanning page with OCR
*/

const AddScreen = ({navigation}) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Expense',
      headerStyle: { 
        backgroundColor: '#90BE6D',
      },
      headerTintColor: 'white',
    })
  }, [navigation])
  const [input, setInput] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shop, setShop] = useState('')
  const createExpense = () => {
    if (input && price && quantity && shop && selDate && auth) {
      setSubmitLoading(true)
      db.collection('expense')
        .add({
          email: auth.currentUser.email,
          expenseObj: input,
          price: price,
          quantity: quantity,
          date: selDate,
          shop: shop,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }

  const clearInputFields = () => {
    alert('Created Successfully')
    setInput('')
    setPrice('')
    setShop('')
    setSelDate(new Date())
    navigation.navigate('Home')
    setSubmitLoading(false)
  }
  // Date Picker
  const [selDate, setSelDate] = useState(new Date())
  const [show, setShow] = useState(false)
  const [mode, setMode] = useState('date')
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === 'ios')
    setSelDate(currentDate)
  }
  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }
  const showDatepicker = () => {
    showMode('date')
  }
  const result = format(selDate, 'dd/MM/yyyy')

  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='dark' />
      <View style={styles.inputContainer}>
      <TextInput
          style={styles.input}
          keyboardType
          placeholder='Add Shop'
          value={shop}
          onChangeText={(text) => setShop(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Add Item'
          value={input}
          onChangeText={(text) => setInput(text)}
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter Price'
          value={price}
          onChangeText={(text) => setPrice(text)}
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter Quantity'
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={selDate}
            mode={mode}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <Text
          style={styles.input}
          placeholder='Select Date'
          value={result}
          onPress={showDatepicker}
          // editable={false}
        >
          {result ? result : new Date()}
        </Text>

        <Button
          containerStyle={styles.button}
          title='Add'
          onPress={createExpense}
          loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  inputContainer: {
    width: 300,
  },
  input: {
    height: 50,
    borderColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  button: {
    width: 300,
    marginTop: 10,
  },
})
