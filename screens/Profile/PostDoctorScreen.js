import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import PostDoctorForm from '../../components/Doctors/PostDoctorForm'
import Toast from 'react-native-easy-toast'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function PostDoctorScreen({ navigation }) {
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    return (
        <KeyboardAwareScrollView>
            <PostDoctorForm 
                toastRef={toastRef} 
                setLoading={setLoading}
                navigation={navigation}
            />
            <Loading isVisible={loading} text="Publicando Doctor"/>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({})
