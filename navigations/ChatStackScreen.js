import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import ChatScreen from '../screens/ChatScreen'

const Stack = createStackNavigator()

export default function HomeStackScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={{headerTintColor:"#38b6ff"}}
            />
        </Stack.Navigator>
    )
}
