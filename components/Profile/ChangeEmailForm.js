import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { reauthenticate, updateEmail, updateProfile} from '../../utils/Actions'
import { validateEmail } from '../../utils/Helpers'

export default function ChangeEmailForm({ email, toastRef, setShowModal, setReloadUser }) {

    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Contraseña incorrecta. Intenta de nuevo")
            return
        }

        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)

        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("Este correo electrónico ya está en uso por otro usuario. Prueba con uno diferente")
            return
        }

        setReloadUser(true)
        toastRef.current.show("¡Éxito! Se ha cambiado el correo electrónico.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true


        if(!validateEmail(newEmail)) {
            setErrorEmail("Ingresa un correo electrónico válido.")
            isValid = false
        }

        if(newEmail === email) {
            setErrorEmail("Ingresa un correo electrónico diferente al actual.")
            isValid = false
        }

        if(isEmpty(password)) {
            setErrorPassword("Ingresa tu contraseña.")
            isValid = false
        }

        return isValid
    }
        

    return (
        <View style={styles.view}>

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Cambiar correo electrónico" 
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                style={styles.textInput}
                inputContainerStyle={{ borderColor: "#38b6ff" }}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="at"
                        size={28}
                        color={"#38b6ff"}
                    />
            }
            />

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Ingresa tu contraseña" 
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}
                keyboardType="email-address "
                style={styles.textInput}
                inputContainerStyle={{ borderColor: "#38b6ff" }}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#38b6ff" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
            }
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="lock-closed"
                        size={28}
                        color={"#38b6ff"}
                    />
            }
            />
            <Button
                title="Cambiar correo electrónico"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10,
        borderRadius: 100,
    },

    input: {
        marginBottom: 10,
    },

    btnContainer: {
        width: "95%",
        borderRadius: 20,
    },

    btn: {
        backgroundColor: "#38b6ff"
    }
})
