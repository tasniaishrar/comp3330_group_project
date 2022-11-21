import React, { useState, useCallback, useLayoutEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ImagePickerModal } from '../components/image-picker-modal';
import { ImagePickerAvatar } from '../components/image-picker-avatar';

export default function ProfilePicScreen({ navigation, route }) {
    const [pickerResponse, setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'Back to Register',
            imageUrl: imageUrl
        })
    }, [navigation])

    const onImageLibraryPress = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
            setImageUrl(result.uri);
            alert(
                'Upload Successful!',
            );
            setVisible(false);

        }
    };

    const onCameraPress = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
            setImageUrl(result.uri);
            alert(
                'Upload Successful!',
            );
            setVisible(false);

        }

        console.log(image)
        console.log(result.uri)

    };


    return (
        <View style={styles.screen}>
            <ImagePickerAvatar uri={image} onPress={() => setVisible(true)} />
            <ImagePickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
            />
            <TouchableOpacity activeOpacity={.5} style={styles.buttonStyle} onPress={() => navigation.navigate('Register', { imageUrl: imageUrl })}>
                <Text style={styles.textStyle}>Save Changes</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: '#f2f2fC',
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
});