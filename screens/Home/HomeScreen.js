import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet } from 'react-native'
import Loading from '../../components/Loading'
import { getCurrentUser, isUserLogged } from '../../utils/Actions'
import { useFocusEffect } from '@react-navigation/native' 

import HomeUserGuest from './HomeUserGuest'
import HomeUserLogged from './HomeUserLogged'

export default function HomeScreen() {
    const [login, setLogin] = useState(null)
    
    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null ) {
        return <Loading isVisible={true} text="Cargando Aplicación"/>
    }

    return login ? <HomeUserLogged/> : <HomeUserGuest/>
}

const styles = StyleSheet.create({
    
})
