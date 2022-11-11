import { Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Divider, ListItem } from 'react-native-elements'
import ModalActions from './ModalActions'

const CustomListItem = ({info, navigation, id}) => {
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <View>
        <ListItem onPress={() => setModalVisible(true)}>
          <View style={styles.left}>
            <Entypo name="credit" size={24} color="white" />
          </View>
          <ListItem.Content>
            <ListItem.Title
              style={{fontWeight: 'bold', textTransform: 'capitalize', paddingBottom: 2}}
            >
              {info?.shop}
            </ListItem.Title>
            <ListItem.Subtitle>
              {info?.expenseObj}
            </ListItem.Subtitle>
          </ListItem.Content>
          <View>
            <ListItem.Content>
              <ListItem.Subtitle style={{color: '#BDBDBD', paddingBottom: 2}}>
                {info?.userDate}
              </ListItem.Subtitle>
              <ListItem.Title style={styles.right}>
                $ {Number(info?.price)?.toFixed(2)}
              </ListItem.Title>
            </ListItem.Content>
          </View>
        </ListItem>
        <Divider style={{backgroundColor: 'lightgrey'}} />
      </View>
      <ModalActions
        info={info}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        navigation={navigation}
        id={id}
      />
    </>
  )
}

export default CustomListItem

const styles = StyleSheet.create({
  left: {
    backgroundColor: '#90BE6D',
    borderRadius: 8,
    padding: 10,
  },
  right: {
    fontWeight: 'bold',
    color: '#7D7D7D',
  },
})
