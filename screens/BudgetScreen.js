import { AntDesign, FontAwesome5, MaterialIcons } from '@expo/vector-icons'
import CircularProgress from 'react-native-circular-progress-indicator';
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { Avatar, Text } from 'react-native-elements'
import CustomListItem from '../components/CustomListItem'
import { auth, db } from '../firebase'


const BudgetScreen = ({navigation}) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'RECEIPTIFY',
      headerStyle: { 
        backgroundColor: '#90BE6D',
      },
      headerTintColor: 'white',
    })
  }, [navigation])
  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: 'Back',
    })
  }, [navigation])


  // transactions
  const [transactions, setTransactions] = useState([])
  useEffect(() => {
    const unsubscribe = db
      .collection('expense')
      .orderBy('timestamp', 'desc')
      .onSnapshot(
        (snapshot) =>
          setTransactions(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ) &
          setTotalExpense(
            snapshot.docs.map((doc) =>
              doc.data()?.email === auth.currentUser.email
                ? doc.data().price
                : 0
            )
          )
      )

    return unsubscribe
  }, [])

  // stufff
  const [totalExpense, setTotalExpense] = useState([])
  const [expense, setExpense] = useState(0)
  
  useEffect(() => {
    if (totalExpense) {
      if (totalExpense?.length == 0) {
        setExpense(0)
      } else {
        setExpense(totalExpense?.reduce((a, b) => Number(a) + Number(b), 0))
      }
    }
  }, [totalExpense, expense])


  const [filter, setFilter] = useState([])
  useEffect(() => {
    if (transactions) {
      setFilter(
        transactions.filter(
          (transaction) => transaction.data.email === auth.currentUser.email
        )
      )
    }
  }, [transactions])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.cardTop}>
             <Text h3 style={{textAlign: 'center', marginLeft: 5, }}>
                  Balance
            </Text>
        </View>
          <View style={styles.cardBottom}>
            <View>
              <View style={styles.cardBottomSame}>
              <CircularProgress
                value={"$3000"}
                radius={120}
                progressValueColor={'#ecf0f1'}
                maxValue={4300}
                title={'70% Spent'}
                titleColor={'white'}
                titleStyle={{fontWeight: 'bold'}}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <TouchableOpacity activeOpacity={.5} style={styles.buttonStyle} onPress={() => navigation.navigate('SetLimit')}>
            <Text style={styles.textStyle}>Set Budget Limit</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} style={styles.buttonStyle}
            onPress={() => navigation.navigate('Add')}>
            <Text style={styles.textStyle}>Add Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={.5} style={styles.buttonStyle}
            onPress={() => navigation.navigate('All')}>
            <Text style={styles.textStyle}>All Transactions</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.addButton}>
        {/*Home Button */}
          <TouchableOpacity
            style={styles.buttonContainer}
            activeOpacity={0.5}
            onPress={() => navigation.navigate('Home')}
          >
            <AntDesign name='home' size={24} color='#66AFBB' />
            <Text style={{padding:3, fontWeight:'700', color:'#7D7D7D'}}>Home</Text>
          </TouchableOpacity>

         {/*QR Scanner Button */}
        <TouchableOpacity
          style={styles.plusButton}
          onPress={() => navigation.navigate('Scan')}
          activeOpacity={0.5}
        >
            <AntDesign name='qrcode' size={50} color='black' />   
        </TouchableOpacity>
        
        {/*Budget Button */}
        <TouchableOpacity disabled={true}
          style={styles.buttonContainer}
          activeOpacity={0.5}
          onPress={() => navigation.navigate('All')}
        >
          <AntDesign name='calculator' size={24} color='#EF8A76' />
          <Text style={{padding:3, fontWeight:'700', color:'#7D7D7D'}}>Budget</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

export default BudgetScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 10,
  },
  profile: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#Fafafa',
    alignItems: 'center',
    width: '100%',
    padding: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 5,
    marginBottom: 15,
  },
  cardTop: {
    // backgroundColor: 'blue',
    marginBottom: 20,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    margin: 'auto',
    backgroundColor: '#fafafa',
    borderRadius: 5,
  },
  cardBottomSame: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recentTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  recentTransactions: {
    backgroundColor: 'white',
    width: '100%',
  },
  seeAll: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 0,
    padding: 10,
    alignSelf: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  plusButton: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,
    elevation: 24,
  },
  containerNull: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
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
  
})
