import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Button, Icon } from 'react-native-elements'
import Loading from '../../components/Loading'
import { validateEmail } from '../../utils/Helpers'
import { sendEmailResetPassword } from '../../utils/Actions'
import { Alert } from 'react-native'

export default function RecoverPassword({ navigation }) {
    const [email, setEmail] = useState("")
    const [errorEmail, setErrorEmail] = useState(null)
    const [loading, setLoading] = useState(false)

    const validateData = () => {
        setErrorEmail(null)
        let isValid = true

        if (!validateEmail(email)) {
            setErrorEmail ("Ingresa un correo electrónico válido.")
            isValid = false
        }

        return isValid
    }

    const onSubmit = async() => {
        if (!validateData()) {
            return
        }

        setLoading(true)
        const result = await sendEmailResetPassword(email)
        setLoading(false)

        if (!result.statusResponse) {
            Alert.alert("Error", "Este correo no está relacionado a ningún usuario.")
            return
        }

        Alert.alert("Confirmación", "Se ha enviado un correo electrónico con los pasos a seguir para recuperar la contraseña.")
        navigation.navigate("Perfil", { screen:"login" })
    }

    return (
        <View style={styles.formContainer}>

            <Input
                placeholder="Ingresa tu correo electrónico"
                containerStyle={styles.inputForm}
                onChange={(e) => setEmail(e.nativeEvent.text)}
                defaultValue={email}
                errorMessage={errorEmail}
                keyboardType="email-address"
                rightIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        iconStyle={styles.icon}
                    />
                }
            />

            <Button
                title="Recuperar Contraseña"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnRecover}
                onPress={onSubmit}
            />
            
            <Loading isVisible={loading} text="Recuperando Contraseña..."/>

        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,
    }, 

    inputForm: {
        width: "90%"
    },

    btnContainer: {
        marginTop: 20,
        width: "85%",
        alignSelf: "center",
    },

    btnRecover: {
        backgroundColor: "#38b6ff"
    },

    icon: {
        color: "#38b6ff",
    }
})
