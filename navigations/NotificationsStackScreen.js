import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import NotificationsScreen from '../screens/NotificationsScreen'

const Stack = createStackNavigator()

export default function NotificationsStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Notificaciones"
                component={NotificationsScreen}
                options={{headerTintColor:"#38b6ff"}}
            />
        </Stack.Navigator>
    )
}
