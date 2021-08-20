import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Image } from 'react-native'
import { Divider } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import LoginForm from '../../components/Profile/LoginForm'

export default function LoginScreen() {
    return (
        <KeyboardAwareScrollView style={styles.view}>
            <Image
                source={require("../../assets/DonTrino.png")}  
                resizeMode="contain"   
                style={styles.image}       
            />
            <View style={styles.container}>
                <LoginForm/>
                <CreateAccount/>
                <RecoverPassword/>
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function RecoverPassword() {
    const navigation = useNavigation()

    return (
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("Recuperar Contraseña")}
        >
            ¿Olvidaste tu contraseña?{" "}
            <Text 
                style={styles.btnRecover}
                onPress={() => navigation.navigate("Recuperar Contraseña")}
        >
                Recupérala{" "} 
            </Text>
        </Text>
    )
}

function CreateAccount(props) {
    const navigation = useNavigation()
    return(
        <Text 
            style={styles.register}
            onPress={() => navigation.navigate("Registro")}
        >
            ¿No tienes una cuenta?{" "}
            <Text style={styles.btnRegister}>
                Regístrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    view: {
        backgroundColor: "#38b6ff"
    },

    image: {
        height: 300,
        width: "102%",
        marginBottom: -100,
        marginVertical: -60,
    },

    container: {
        marginHorizontal: 40,
    },

    divider: {
        backgroundColor: "#fff",
        margin: 40,
    },

    register: {
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center",
        color: "#fff",
    },

    btnRegister: {
        color: "#fff",
        fontWeight: "bold"
    },

    btnRecover: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: -50,
    },

    text: {
        color: "#fff",
        fontWeight: "bold",
        marginTop: 12
    }
})