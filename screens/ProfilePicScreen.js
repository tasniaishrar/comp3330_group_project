import {Avatar} from 'react-native-paper'
import {StatusBar} from 'expo-status-bar'
import React, {Component, useLayoutEffect, useState} from 'react'
import {StyleSheet, View, KeyboardAvoidingView, Text, TouchableHighlight} from 'react-native'
import {Input, Button} from 'react-native-elements'
import {auth} from '../firebase'
import logo from '../assets/splash.png'
import{launchCamera,launchImageLibrary} from 'react-native-image-picker'

const ProfilePicScreen = ({navigation}) => {
    const [Pic, SetPic] = React.useState('');
    const [Snap, SetSnap] = React.useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
          headerBackTitle: 'Back to Register',
        })
      }, [navigation])

    //trial #2
      const LoadLib = () =>{
        launchImageLibrary({}, (response)=>{
            if(response.didCancel){
                alert('Cancelled Image Selection')
            }
            else if(response.errorCode=='permission'){
                alert('Please allow access to your device galary')
            }else if(response.errorCode=='others'){
                alert(response.errorCode)
            }else if(response_assets[0].fileSize > 2097152){
                alert('Maximum image size exceeded \n Please choose image under 2MB')
            }else{
                SetPic(response.assets[0].base64);
            }    
        })
    }

    const Loadcamera =()=>{
        launchCamera({}, (response)=>{
            const source ={uri: response?.uri};
            console.log(source);
            setImage(source)
        })
    }

    //trial #1
    // const uploadImage = () => {
    //     let options = {
    //         mediaType: 'photo',
    //         quality:1,
    //         includeBase64: true,
    //     };

        

        // launchImageLibrary(options,response=>{
        //     if(response.didCancel){
        //         alert('Cancelled Image Selection')
        //     }
        //     else if(response.errorCode=='permission'){
        //         alert('Please allow access to your device galary')
        //     }else if(response.errorCode=='others'){
        //         alert(response.errorCode)
        //     }else if(response_assets[0].fileSize > 2097152){
        //         alert('Maximum image size exceeded \n Please choose image under 2MB')
        //     }else{
        //         SetPic(response.assets[0].base64);
        //     }
        // })
    
    
    return(
        <KeyboardAvoidingView style={styles.container}>
            <StatusBar style='light' />
                <Text h4 style={{marginBottom: 50}}>
                Upload a Picture
                </Text>
                <View>
                    <View style={styles.centerContent}>
                        <TouchableHighlight
                            style={styles.centerContent}
                            onPress={()=>uploadImage()}
                            underlayColor= "rgba(0,0,0,0)">
                            <Avatar.Image
                                style={styles.centerContent}
                                size={250}
                                source={{uri:'data:image/png;base64,'+Pic}}/>
                        </TouchableHighlight>
                    </View>
                    <View style={[styles.centerContent]}>
                        <Button 
                            containerStyle={styles.button}
                            onPress={()=>LoadLib()}
                            title='Upload Image'
                        />
                        <Button
                            containerStyle={styles.button}
                            onPress={()=>Loadcamera()}
                            title='Capture Image'
                        />
            </View>
        </View>
    </KeyboardAvoidingView>

    );
}

export default ProfilePicScreen

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
  