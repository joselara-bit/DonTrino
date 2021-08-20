import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from '../screens/Onboarding/SplashScreen';
import SplashScreen2 from '../screens/Onboarding/SplashScreen2';
import SplashScreen3 from '../screens/Onboarding/SplashScreen3';
import SplashScreen4 from '../screens/Onboarding/SplashScreen4';
import SplashScreen5 from '../screens/Onboarding/SplashScreen5';
import SplashScreen6 from '../screens/Onboarding/SplashScreen6';
import SplashScreen7 from '../screens/Onboarding/SplashScreen7';
import LoginScreen from '../screens/Profile/LoginScreen';
import RegisterScreen from '../screens/Profile/RegisterScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="SplashScreen2" component={SplashScreen2}/>
            <RootStack.Screen name="SplashScreen3" component={SplashScreen3}/>
            <RootStack.Screen name="SplashScreen4" component={SplashScreen4}/>
            <RootStack.Screen name="SplashScreen5" component={SplashScreen5}/>
            <RootStack.Screen name="SplashScreen6" component={SplashScreen6}/>
            <RootStack.Screen name="SplashScreen7" component={SplashScreen7}/>
            <RootStack.Screen name="LoginScreen" component={LoginScreen}/>
            <RootStack.Screen name="Registro" component={RegisterScreen}/>
        </RootStack.Navigator>
        );
    }
    
export default RootStackScreen;