import React, {useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import Loading from "../../components/Loading"
import { getDoctors, getMoreDoctors } from "../../utils/Actions"
import ListDoctors from '../../components/Doctors/ListDoctors'
import {size} from 'lodash'
import {Doctor} from '../../components/Doctors/ListDoctors'

export default function HomeUserLogged() {
    const navigation = useNavigation()
    const [startDoctor, setStartDoctor] = useState(null)
    const [doctors, setDoctors] = useState([])
    const [loading, setLoading] = useState(false)

    const limitDoctors = 7

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true);
                const response = await getDoctors(limitDoctors);
                if(response.statusResponse) {
                    setStartDoctor(response.startDoctor);
                    setDoctors(response.doctors);
                }
                setLoading(false)
            }
            getData()
        }, [])
    )

    const handleLoadMore = async() => {
        if (!startDoctor) {
            return
        }

        setLoading(true);
            const response = await getMoreDoctors( limitDoctors, startDoctor );
                
            if(response.statusResponse) {
                setStartDoctor(response.startDoctor);
                setDoctors([...doctors, ...response.doctors]);
            }
        setLoading(false);
    }

    return (
        <View style={styles.container}>
        {
            size(doctors) > 0 ? (
                <ListDoctors
                    doctors={doctors}
                    navigation={navigation}
                    handleLoadMore={handleLoadMore}
                />
            ) : (
                <View style={styles.notFoundView}>
                    <Text style={styles.notFoundText}>No hay doctores registrados.</Text>
                </View>
            )
        }
                <Icon
                    type="ionicon"
                    name="search"
                    color="#38b6ff"
                    reverse
                    containerStyle={styles.btnContainer}
                    onPress= {() => navigation.navigate("Buscar")}
                />
            
        <Loading isVisible={loading} text="Cargando listado de Doctores"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },

    btnContainer: {
        position: "absolute",
        bottom: 20,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 20, height: 20},
        shadowOpacity: 0.5
    },

    notFoundView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
    },

    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})
