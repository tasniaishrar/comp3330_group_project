import {StatusBar} from 'expo-status-bar'
import React, {useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView} from 'react-native'
import {Input, Button, Text, Image} from 'react-native-elements'
import {auth} from '../firebase'
import logo from '../assets/splash.png'
import * as ImagePicker from 'expo-image-picker'

// function Photo({navigation}) {
//   const[image, setImage] = useState('');
//   useEffect(() => {
//     enableAccess();
//   }, []);

//   const enableAccess= async () => {
//     const {granted} = await ImagePicker.requestMediaLibraryPermissionsAsync();
  
//     if (!granted) alert('Please allow access to your photo album');
//   };

//   const chooseImage = async () => {
//     try {
//       const data = await ImagePicker.launchImageLibraryAsyncy({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         quality: 0.5,
//       })
//       console.log(data.uri);
      
//       if (!data.cancelled) setImage(data.uri);
//     } catch (error) {
//       console. log( 'Error', error);
//     }
//   };
//   return(
//   );
// }

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back to Login',
    })
  }, [navigation])

  const signUp = () => {
    if (fullName && email && password) {
      setSubmitLoading(true)
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
          clearInputFields() &
            authUser.user.updateProfile({
              displayName: fullName,
              photoURL:
                imageUrl ||
                'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVe0cFaZ9e5Hm9X-tdWRLSvoZqg2bjemBABA&usqp=CAU',
            })
        })
        .catch((err) => alert(err.message) & setSubmitLoading(false))
    } else {
      alert('All fields are mandatory')
      setSubmitLoading(false)
    }
  }
  const clearInputFields = () => {
    alert('Successfully Created Account')
    navigation.replace('Home')
    setSubmitLoading(false)
    setFullName('')
    setEmail('')
    setPassword('')
    setImageUrl('')
  }
  return (
    <KeyboardAvoidingView behavior='padding' style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={logo}
        style={{width: 100, height: 100, marginBottom: 20}}
      />
      <Text h4 style={{marginBottom: 50}}>
        Create an account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder='Full Name'
          type='text'
          autoFocus
          value={fullName}
          onChangeText={(text) => setFullName(text)}
        />
        <Input
          placeholder='Email'
          type='text'
          
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder='Password'
          type='text'
          
          value={password}
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        {/* <View style={styles.screen}>
          <View style= {styles.imageContainer}>
              {image.length >0 && (
                <Image source={{uri: image}} style = {styles.image} />
              )}
            <Button title="Choose Image" onpress={chooseImage}/>
          </View>
        </View> */}
        <Button
            onPress={() => navigation.navigate('Pic')}
            containerStyle={styles.button}
            title='Choose Profile Picture (Optional)'
        />

        {/* <Input
          placeholder='Profile Picture Url (Optional)'
          type='text'
         
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={signUp}
        /> */}
      </View>
      <Button
        containerStyle={styles.button}
        type='outline'
        title='Register'
        onPress={signUp}
        loading={submitLoading}
      />
    </KeyboardAvoidingView>
  )
}

export default RegisterScreen

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
    backgroundColor:'#97B973',
  },
})
