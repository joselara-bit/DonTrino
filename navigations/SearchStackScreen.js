import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import SearchScreen from '../screens/SearchScreen'

const Stack = createStackNavigator()

export default function SearchStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Buscar"
                component={SearchScreen}
                options={{headerShown: true, headerTintColor: "#38b6ff"}}
            />
        </Stack.Navigator>
    )
}
