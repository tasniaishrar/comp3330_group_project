import { EvilIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons'
import React from 'react'
import {
  Alert, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View
} from 'react-native'
import { db } from '../firebase'

const ModalActions = ({info, modalVisible, setModalVisible, navigation, id}) => {
  const deleteExpense = () => {
    db.collection('expense')
      .doc(id)
      .delete()
      .then(() => alert('Deleted Successfully'))
      .catch((error) => alert(error.message))
  }

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='none'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          setModalVisible(!modalVisible)
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIcon}>
              <Pressable
                style={[styles.buttonCloise]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <FontAwesome5 name='times-circle' size={24} color='black' />
              </Pressable>
            </View>

            <View>
              <Text style={{fontWeight: 'bold', textAlign: 'center', fontSize: 20, marginBottom: 10}}>
                {info?.shop}
              </Text>
              <View style={{ flexDirection: 'row', paddingBottom:5}}>
                <View style={{ flex: 1 }}>
                  <Text>{info?.userDate}</Text>
                  <Text style={{fontWeight: 'bold', paddingBottom:20 }}>
                    {info?.expenseObj} 
                  </Text>
                </View>

                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text>Quantity</Text>
                  <Text>
                    X{info?.quantity}
                  </Text>
                </View>
                
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text>Price</Text>
                  <Text>
                    HK${info?.price}
                  </Text>
                </View>
              </View>
            </View>

            <View>
              <Text style={{textAlign: 'center', fontSize: 16, marginBottom: 30}}>
                Total Price HK${ }
              </Text>
            </View>

            <View style={styles.handleIcons}>              
              <TouchableOpacity activeOpacity={0.5} style={styles.pencil}>
                <EvilIcons
                  name='pencil'
                  size={40}
                  color='#61ACB8'
                  onPress={() =>
                    navigation.navigate('Update', {
                      itemId: id,
                    }) & setModalVisible(!modalVisible)
                  }
                />
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.5} style={styles.trash}>
                <FontAwesome
                  name='trash-o'
                  onPress={() => deleteExpense()}
                  size={32}
                  color='red'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalActions

const styles = StyleSheet.create({
  pencil: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    padding: 8,
  },
  trash: {
    backgroundColor: 'aliceblue',
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 15
  },
  closeIcon: {
    position: 'absolute',
    top: 6,
    right: 6,
  },
  handleIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  }, 
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    marginHorizontal: 5,
    marginVertical: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  col1: {
    flex:1,
    padding: 10,
  },
  col2: {
    flex:1,
    fontWeight: 'bold',
    color: 'black',
  },
  col3: {
    flex:1,
  }
})
