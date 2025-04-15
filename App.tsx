import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Homepage from './Pages/Homepage';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';
import SplashScreen from './components/SplashScreen';
import Profile from 'Pages/Profile';
import ProfileEdit from 'Pages/ProfileEdit';
import SearchResult from 'Pages/SearchResult';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Login: undefined;
  Signup: undefined;
  Profile: undefined;
  ProfileEdit: undefined;
  SearchResult: undefined;
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
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}