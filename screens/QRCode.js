import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, View, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { auth, db } from '../firebase'

export default function QRScanner({navigation}) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'All Transactions',
      headerStyle: { 
        backgroundColor: '#90BE6D',
      },
      headerTintColor: 'white',
      headerBackTitle: 'Back'
    })
  });

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    object = JSON.parse(data)
    obj2 = JSON.stringify(data)
    if(obj2.date === null || obj2.shop=== null || obj2.expenseObj=== null|| 
      obj2.price=== null || obj2.quantity === null){
        alert('Incorrect barcode. Scan again!');
        navigation.navigate('Scan');
      }
    else{
        sendData(object.date, object.shop, object.expenseObj, object.price, object.quantity);
      alert(
        'Scan Successful!',
      );
      navigation.navigate('All');
    }
    sendData(object.date, object.shop, object.expenseObj, object.price, object.quantity);
    alert(
      'Scan Successful!',
    );
    navigation.navigate('All');
  };


  const sendData = (date, shop, expenseObj, price, quantity) => {
      db.collection('expense')
        .add({
          email: auth.currentUser.email,
          expenseObj: expenseObj,
          price: price,
          quantity: quantity,
          date: date,
          shop: shop,
          timestamp: date,
          userDate: date,
        })
        .catch((error) => alert(error.message))
   }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {/* {scanned && <Button title ="Details" onPress={() => navigation.navigate('All')}/> } */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
});