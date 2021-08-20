import React, { useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useFocusEffect } from '@react-navigation/native' //EL useFocusEffect SIEMPRE SE VA A IMPORTAR DE @react-navigation/native

import { getTopDoctors } from '../../utils/Actions'
import Loading from '../../components/Loading'
import ListTopDoctors from '../../components/Ranking/ListTopDoctors'

export default function TopDoctorsScreen({ navigation }) {
    const [doctors, setDoctors] = useState(null)
    const [loading, setLoading] = useState(false)

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getTopDoctors(10)
                if (response.statusResponse) {
                    setDoctors(response.doctors)
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    return (
        <View>
            <ListTopDoctors
                doctors={doctors}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Espere, por favor..." />
        </View>
    )
}

const styles = StyleSheet.create({})
