import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './Pages/Homepage';
import Login from './Pages/Account/Login';
import Signup from './Pages/Account/SignUp';
import SplashScreen from './components/SplashScreen';
import DetailsProduct from './Pages/DetailsProduct';
import Messager from './Pages/Messager';
import Profile from './Pages/Account/Profile';
import CartProduct from './Pages/Cart';
import ProfileEdit from './Pages/Account/ProfileEdit';
import SearchResult from './Pages/SearchResult';
import Chat from './Pages/Chat';
import Notification from './Pages/Notification';
import Category from 'Pages/Category';
import Design from './Pages/Design';
import Pending from 'Pages/Order/Pending';
import OnDeliver from 'Pages/Order/OnDeliver';
import Sent from 'Pages/Order/Sent';


type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  SearchResult: undefined;
  Notification: undefined;
  Chat: undefined;
  Messager: undefined;
  DetailsProduct: undefined;
  Details: undefined;
  Cart: undefined;
  Category: undefined;
  Design: undefined;
  Pending: undefined;
  OnDeliver: undefined;
  Send: undefined;
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={Homepage} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
        <Stack.Screen name="SearchResult" component={SearchResult} />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="Messager" component={Messager} />
        <Stack.Screen name="DetailsProduct" component={DetailsProduct} />
        <Stack.Screen name="Details" component={DetailsProduct}/>
        <Stack.Screen name="Cart" component={CartProduct}/>
        <Stack.Screen name="Category" component={Category}/>
        <Stack.Screen name="Design" component={Design}/>
        <Stack.Screen name="Pending" component={Pending}/>
        <Stack.Screen name="OnDeliver" component={OnDeliver}/>
        <Stack.Screen name="Sent" component={Sent}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}