import React, {useEffect, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {Input, Button, Image, Text} from 'react-native-elements'
import {StatusBar} from 'expo-status-bar'
import {auth} from '../firebase'
import logo from '../assets/splash.png'


const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const signIn = () => {
    if (email && setEmail) {
      setSubmitLoading(true)
      auth
        .signInWithEmailAndPassword(email, password)
        .then(() => clearInputFields())
        .catch((error) => alert(error.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Logged in')
    navigation.replace('Home')
    setSubmitLoading(false)
    setEmail('')
    setPassword('')
  }

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace('Home')
        setLoading(false)
      } else {
        setLoading(false)
      }
    })
    return unsubscribe
  }, [])
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Loading...',
    })
    if (!loading) {
      navigation.setOptions({
        title: 'Login',
      })
    }
  }, [navigation, loading])

  return (
    <>
      {!loading ? (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <StatusBar style='light' />
          <Image
            source={logo}
            style={{width: 300, height: 300, marginBottom: 50}}
          />
          <View style={styles.inputContainer}>
            <Input
              type='email'
              placeholder='Email'
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <Input
              type='password'
              secureTextEntry
              placeholder='Password'
              value={password}
              onChangeText={(text) => setPassword(text)}
              onSubmitEditing={signIn}
            />
          </View>
          <Button
            loading={submitLoading}
            containerStyle={styles.button}
            title='Login'
            onPress={signIn}
          />
          <View style={{paddingTop: 20}}>
            <Text h6 style={{color: 'grey'}}>New user? Register here</Text> 
          </View>
          
          <Button
            onPress={() => navigation.navigate('Register')}
            containerStyle={styles.button}
            title='Register'
          />
          <View style={{height: 50}}></View>
        </KeyboardAvoidingView>
      ) : (
        <View style={styles.container}>
          <StatusBar style='light' />
          <Image
            source={logo}
            style={{width: 100, height: 100, marginBottom: 50}}
          />
          <Text h4>Loading...</Text>
        </View>
      )}
    </>
  )
}
export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#FAFAFA',
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 300,
    marginTop: 10,
    color: '#000000',
    backgroundColor: '#97B973'
  },
})
