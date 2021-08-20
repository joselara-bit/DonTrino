import React, {useState} from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { createStackNavigator } from '@react-navigation/stack';
import { Icon } from 'react-native-elements'

import HomeStackScreen from './HomeStackScreen'
import ChatStackScreen from './ChatStackScreen'
import SearchStackScreen from './SearchStackScreen'
import NotificationsStackScreen from './NotificationsStackScreen'
import ProfileStackScreen from './ProfileStackScreen'

const Tab = createBottomTabNavigator();

export default function Navigation() {
    const screenOptions = (route, color) => {
        let iconName
        switch (route.name) {
            case "Inicio":
                iconName = "home"
                break;
            case "Chat":
                iconName = "chatbubble-ellipses"
                break;
            case "Buscar":
                iconName = "search"
                break;
            case "Notificaciones":
                iconName = "notifications"
                break;
            case "Perfil":
                iconName = "person-circle"
                break;
        }

        return (
            <Icon
                type="ionicon"
                name={iconName}
                size={26}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Inicio"
                tabBarOptions={{
                    inactiveTintColor: "#808080",
                    activeTintColor: "#38b6ff"
                }}
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color }) => screenOptions(route, color)
                })}
            >
                <Tab.Screen
                    name="Inicio"
                    component={HomeStackScreen}         
 
                />
                <Tab.Screen
                    name="Chat"
                    component={ChatStackScreen}                
                />
                <Tab.Screen
                    name="Buscar"
                    component={SearchStackScreen}                
                />
                <Tab.Screen
                    name="Notificaciones"
                    component={NotificationsStackScreen}                
                />
                <Tab.Screen
                    name="Perfil"
                    component={ProfileStackScreen}                
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
