import React, { useState, useRef, useEffect, useFocusEffect, useCallback } from 'react'
import { Button } from 'react-native-elements'
import { StyleSheet, Text, ScrollView, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { closeSession, getCurrentUser, deleteUser } from '../../utils/Actions'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import InfoUser from '../../components/Profile/InfoUser'
import {getDocumentById} from '../../utils/Actions'
import { Alert } from 'react-native'
import ProfileOptions from '../../components/Profile/ProfileOptions'
import { render } from 'react-dom'
import { deleteCollection } from '../../utils/Actions'

export default function UserLogged({ route }) {
    const toastRef = useRef()
    const navigation = useNavigation()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] = useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(() => {
        setUser(getCurrentUser())
        setReloadUser(false)
    }, [reloadUser])

        return (
        <ScrollView style={styles.container}>
        {
            user && (
                <View>
                    <InfoUser 
                        user={user} 
                        users={users}
                        setLoading={setLoading} 
                        setLoadingText={setLoadingText}
                        
                    />
                    <ProfileOptions
                        user={user}
                        /* displayName={displayName} */
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                </View>
            )
        }

            <Button
                title="Eliminar Usuario"
                buttonStyle={styles.btnDeleteUser}
                titleStyle={styles.btnDeleteUserTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("Inicio")
                }}
            />

            <Button
                title="Cerrar Sesión"
                buttonStyle={styles.btnCloseSession}
                titleStyle={styles.btnCloseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("Inicio")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={loadingText}/>
        </ScrollView>
        );
    }

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9",
        marginVertical: 20
    },
    
    btnCloseSession: {
        borderRadius: 13,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "red",
        paddingVertical: 10,
        marginTop: -20,
        marginVertical: 30,
    },

    btnCloseSessionTitle: {
        marginTop: 10,
    },

    btnDeleteUser: {
        borderRadius: 13,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "red",
        paddingVertical: 10,
        marginTop: 20,
        marginVertical: 50,
    },
})
