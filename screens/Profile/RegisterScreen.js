import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import RegisterForm from '../../components/Profile/RegisterForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function RegisterScreen() {
    return (
        <KeyboardAwareScrollView style={styles.view}>
            <Image
                source={require("../../assets/DonTrino.png")}  
                resizeMode="contain"   
                style={styles.image}       
            />
            <RegisterForm/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#38b6ff",
        flex: 1,
    },

    image: {
        height: 300,
        width: "102%",
        marginBottom: -100,
        marginVertical: -60,
    },

})
