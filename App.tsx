import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import SplashScreen from './components/SplashScreen';
import DetailsProduct from 'Pages/DetailsProduct';
import Messager from 'Pages/Messager';
import CartProduct from 'Pages/Cart';
import Profile from './Pages/Profile';
import ProfileEdit from './Pages/ProfileEdit';
import SearchResult from './Pages/SearchResult';
import Notification from './Pages/Notification';
import Chat from './Pages/Chat';
import OrderProduct from './Pages/OrderProduct';
import OrderDetails from './Pages/OrderDetails';

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
  Order: undefined;
  OrderDetails: { item: any };
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Order"
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
        <Stack.Screen name="Order" component={OrderProduct}/>
        <Stack.Screen name="OrderDetails" component={OrderDetails}/>
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
