import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { reauthenticate, updateEmail, updatePassword, updateProfile} from '../../utils/Actions'
import { validateEmail } from '../../utils/Helpers'

export default function ChangePasswordForm({ toastRef, setShowModal }) {

    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword] = useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword] = useState(false)
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorCurrentPassword("Contraseña incorrecta. Intenta de nuevo")
            return
        }

        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)

        if (!resultUpdatePassword.statusResponse) {
            setErrorNewPassword("Hubo un problema al cambiar tu contraseña. Intentalo de nuevo más tarde")
            return
        }

        toastRef.current.show("¡Éxito! Se ha cambiado la contraseña.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)) {
            setErrorCurrentPassword("Ingresa tu contraseña actual.")
            isValid = false
        }

        if(size(newPassword) < 6 ) {
            setErrorNewPassword("Ingresa una nueva contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(size(confirmPassword) < 6 ) {
            setErrorConfirmPassword("Ingresa una confirmación de contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(newPassword !== confirmPassword) {
            setErrorNewPassword("La confirmación no coincide con la contraseña nueva.")
            setErrorConfirmPassword("La confirmación no coincide con la contraseña nueva.")
            isValid = false
        }

        if(newPassword === currentPassword) {
            setErrorNewPassword("Ingresa una contraseña diferente a la actual.")
            setErrorCurrentPassword("Ingresa una contraseña diferente a la actual.")
            setErrorConfirmPassword("Ingresa una contraseña diferente a la actual.")
            isValid = false
        }

        return isValid
    }
        

    return (
        <View style={styles.view}>

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Ingresa tu contraseña actual" 
                containerStyle={styles.input}
                defaultValue={currentPassword}
                onChange={(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage={errorCurrentPassword}
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

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Ingresa tu nueva contraseña" 
                containerStyle={styles.input}
                defaultValue={newPassword}
                onChange={(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage={errorNewPassword}
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

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Ingresa la confirmación de tu nueva contraseña" 
                containerStyle={styles.input}
                defaultValue={confirmPassword}
                onChange={(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage={errorConfirmPassword}
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
                title="Cambiar contraseña"
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
