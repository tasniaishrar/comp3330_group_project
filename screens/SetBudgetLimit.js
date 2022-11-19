import { StatusBar } from 'expo-status-bar'
import React, { useLayoutEffect, useState } from 'react'
import { Button, KeyboardAvoidingView, StyleSheet, TextInput, View } from 'react-native'
import { auth, db } from '../firebase'

const SetBudgetLimit = ({ navigation }) => {
  const [submitLoading, setSubmitLoading] = useState(false)
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'RECEIPTIFY',
      headerStyle: {
        backgroundColor: '#90BE6D',
      },
      headerTintColor: 'white',
      headerBackTitle: 'Back'
    })
  }, [navigation])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
    })
  }, [navigation])

  const [budget, setBudget] = useState('')
  const createBudget = () => {
    if (budget && auth) {
      setSubmitLoading(true)
        db.collection('budget')
          .add({
            email: auth.currentUser.email,
            userBuget: budget,
          })
          .then(() => clearInputFields())
          .catch((error) => alert(error.message))
    }
    else {
      alert('Please fill in the Budget field')
      setSubmitLoading(false)
    }
  }
  
  const clearInputFields = () => {
    alert('Budget set!')
    setBudget('')
    navigation.navigate('Budget')
    setSubmitLoading(false)
  }

    return (
      <KeyboardAvoidingView style={styles.container}>
        <StatusBar style='dark' />
        <View style={styles.inputContainer}>

          <TextInput
            style={styles.input}
            keyboardType='numeric'
            placeholder='Set New Budget Limit'
            value={budget}
            onChangeText={(text) => setBudget(text)}
          />

          <Button
            containerStyle={styles.button}
            title='Add'
            onPress={createBudget}
            loading={submitLoading}
          />
        </View>
      </KeyboardAvoidingView>
  )
}
    
export default SetBudgetLimit

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
