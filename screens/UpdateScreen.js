import DateTimePicker from '@react-native-community/datetimepicker'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import firebase from 'firebase'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { Button, Text } from 'react-native-elements'
import { db } from '../firebase'

const UpdateScreen = ({route, navigation}) => {
  const [transactions, setTransactions] = useState([])
  const {itemId} = route.params
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Update Expense',
      headerStyle:{
        backgroundColor: '#90BE6e',
      },
      headerTintColor: 'white'
    })
  }, [navigation])
  const [input, setInput] = useState('')
  const [price, setPrice] = useState('')
  const [quantity, setQuantity] = useState('')
  const [shop, setShop] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .doc(itemId)
      .onSnapshot(
        (snapshot) =>
          setInput(snapshot.data()?.expenseObj) &
          setPrice(snapshot.data()?.price) &
          setQuantity(snapshot.data()?.quantity) &
          setShop(snapshot.data()?.shop) &
          setSelDate(
            parse(snapshot.data()?.userDate, 'dd/MM/yyyy', new Date())
          )
      )
    return unsubscribe
  }, [])

  const updateExpense = () => {
    if (input && price && quantity && shop && selDate) {
      setSubmitLoading(true)
      db.collection('expense')
        .doc(itemId)
        .update({
          expenseObj: input,
          price: price,
          quantity: quantity,
          shop: shop,
          date: selDate,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          userDate: result,
        })
        .then(() => clearInputFields())
        .catch((error) => alert(error.message))
    } else {
      setSubmitLoading(false)
      alert('All fields are mandatory')
    }
  }

  const clearInputFields = () => {
    alert('Updated Successfully')
    setInput('')
    setPrice('')
    setQuantity('')
    setShop('')
    setSelDate(new Date())
    navigation.goBack()
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
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <View style={styles.inputContainer}>
        
      <TextInput
          style={styles.input}
          placeholder='Add Shop'
          value={shop}
          // defaultValue={transactions.text}
          onChangeText={(text) => setShop(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Add Item'
          value={input}
          // defaultValue={transactions.text}
          onChangeText={(text) => setInput(text)}
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter Price'
          value={price}
          onChangeText={(text) => setPrice(text)}
          defaultValue={transactions.price}
        />

        <TextInput
          style={styles.input}
          keyboardType='numeric'
          placeholder='Enter Quantity'
          value={quantity}
          onChangeText={(text) => setQuantity(text)}
          defaultValue={transactions.price}
        />

        {show && (
          <DateTimePicker
            testID='dateTimePicker'
            value={selDate}
            mode={mode}
            defaultValue={transactions?.date}
            is24Hour={true}
            display='default'
            onChange={onChange}
          />
        )}

        <Text
          style={styles.input}
          placeholder='Select Date'
          onPress={showDatepicker}
        >
          {result ? result : new Date()}
        </Text>

        <Button
          containerStyle={styles.button}
          title='Update'
          onPress={updateExpense}
          loading={submitLoading}
        />
      </View>
    </KeyboardAvoidingView>
  )
}

export default UpdateScreen

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
