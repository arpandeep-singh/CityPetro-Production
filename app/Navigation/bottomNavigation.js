// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { BottomNavigation, BottomNavigationTab, Layout, Text, Button } from '@ui-kitten/components';
// import Invoices_all from '../screens/Invoices_all';
// import Jobs_all from '../screens/Jobs_all';
// import LoginScreen from '../screens/LoginScreen';
// import  {CreateNewJobScreen}  from '../screens/CreateNewJobScreen';
// import { AddPaymentScreen } from '../screens/AddPaymentScreen'
// import { SafeAreaView,View } from 'react-native';

// const { Navigator, Screen } = createBottomTabNavigator();

// const jobs = (props)=>(
//  <View {...props} style={{justifyContent:"center",alignContent:"center",alignItems:"center"}}>
//    <Button>JOBS</Button>
//  </View>
// )
// const settings = (props)=>(
//  <View {...props}>
//    <Button>SETTINGS</Button>
//  </View>
// )

// const BottomTabBar = ({ navigation, state }) => (
//   <BottomNavigation
//     selectedIndex={state.index}
//     onSelect={index => navigation.navigate(state.routeNames[index])}>
//     <BottomNavigationTab title='JOBS'/>
//     <BottomNavigationTab title='SETTINGS'/>
//     {/* <BottomNavigationTab title='INVOICES'/>
//     <BottomNavigationTab title='NEW INV'/>
//     <BottomNavigationTab title='NEW JOB'/> */}
//   </BottomNavigation>
// );

// const TabNavigator = () => (
//   <Navigator tabBar={props => <BottomTabBar {...props} />}>
//     <Screen name="Jobs" component={Jobs_all}/>
//     <Screen name="Seetings" component={settings}/>
//     {/* <Screen name='Jobs' component={Jobs_all}/>
//     <Screen name='Invoices' component={Invoices_all}/>
//     <Screen name='NewInvoice' component={AddPaymentScreen}/>
//     <Screen name='NewJob' component={CreateNewJobScreen}/> */}
//   </Navigator>
// );

// export const BottomNavigator = () => (
//   <NavigationContainer>

//       <TabNavigator/>

//   </NavigationContainer>
// );
