import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screens/Home/HomeScreen'
import DoctorScreen from '../screens/Home/DoctorScreen'
import AddReviewDoctor from '../screens/Home/AddReviewDoctor'

const Stack = createStackNavigator()

export default function HomeStackScreen() {

    return (
        <Stack.Navigator>

            <Stack.Screen
                name="DonTrino"
                component={HomeScreen}
                options={{ headerTintColor:"#38b6ff" }}
            />

            <Stack.Screen
                name="doctor"
                component={DoctorScreen}
            />

            <Stack.Screen
                name="addreview"
                component={AddReviewDoctor}
                options={{ title: "Añadir comentario"}}
            />

        </Stack.Navigator>
    )
}
