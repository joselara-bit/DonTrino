import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import ProfileScreen from '../screens/Profile/ProfileScreen'
import LoginScreen from '../screens/Profile/LoginScreen'
import RegisterScreen from '../screens/Profile/RegisterScreen'
import PostDoctorScreen from '../screens/Profile/PostDoctorScreen'
import FavoriteScreen from '../screens/Profile/FavoriteScreen'
import RecoverPassword from '../screens/Profile/RecoverPassword'
import TopDoctorsScreen from '../screens/Profile/TopDoctorsScreen'
import PrivacyScreen from '../screens/Profile/PrivacyScreen'
import TermsScreen from '../screens/Profile/TermsScreen'

const Stack = createStackNavigator()

export default function ProfileStackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Perfil"
                component={ProfileScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{
                    headerTintColor:"#fff", 
                    title: "Iniciar Sesión",
                    headerStyle: {
                        backgroundColor: '#38b6ff',
                      }, }}
            />
            <Stack.Screen
                name="Registro"
                component={RegisterScreen}
                options={{
                    headerTintColor:"#fff", 
                    title: "Regístrate",
                    headerStyle: {
                        backgroundColor: '#38b6ff',
                      }, }}
            />

            <Stack.Screen
                name="Recuperar Contraseña"
                component={RecoverPassword}
                options={{
                    headerTintColor:"#38b6ff", 
                    title: "Recuperar Contraseña",
                }}
            />

            <Stack.Screen
                name="Publicar Servicios"
                component={PostDoctorScreen}
                options={{ headerTintColor:"#38b6ff" }}
            />

            <Stack.Screen
                name="FavoriteDoctors"
                component={FavoriteScreen}
                options={{ headerTintColor:"#38b6ff", title: "Tus Doctores Favoritos" }}
            />

            <Stack.Screen
                name="TopDoctors"
                component={TopDoctorsScreen}
                options={{ headerTintColor:"#38b6ff", title: "Top Mejores Doctores" }}
            />

            <Stack.Screen
                name="Privacy"
                component={PrivacyScreen}
                options={{ headerTintColor:"#38b6ff", title: "Aviso de Privacidad" }}
            />

            <Stack.Screen
                name="Terms"
                component={TermsScreen}
                options={{ headerTintColor:"#38b6ff", title: "Términos y Condiciones" }}
            />
        </Stack.Navigator>
    )
}
