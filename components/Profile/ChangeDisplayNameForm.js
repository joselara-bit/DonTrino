import React, {useState} from 'react'
import { isEmpty, size } from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { updateProfile} from '../../utils/Actions'

export default function ChangeDisplayNameForm({ displayName, toastRef, setShowModal, setReloadUser }) {
    const [formData, setFormData] = useState(defaultFormValues())

    const onChange = ( e, type ) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async() => {
        if(!validateForm()) {
            return 
        }

        setLoading(true)
        const result = await updateProfile({ displayName: newDisplayName })
        setLoading(false)

        if (!result.statusResponse) {
            setError("Ha ocurrido un error al cambiar los nombres y apellidos. Intenta de nuevo.")
            return
        }
        
        setReloadUser(true)
        toastRef.current.show("¡Éxito! Se han cambiado los nombres y apellidos.", 3000)
        setShowModal(false)
    }

    const validateForm = () => {
        setError(null)
        let isValid = true

        if(isEmpty(newDisplayName)) {
            setError("Ingresa nombres y apellidos")
            return false
        }

        if(newDisplayName === displayName) {
            setError("Ingresa nombres y apellidos diferentes a los actuales")
            return false
        }

        if(size(newDisplayName) < 15) {
            setError("Ingresa tu nombre completo.")
            return false
        }

        return true
    }
        

    return (
        <View style={styles.view}>

            <Input
                color= "#38b6ff"
                placeholderTextColor="#38b6ff"
                placeholder="Cambiar Nombres y Apellidos" 
                onChange={(e) => onChange(e, "name")}
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                style={styles.textInput}
                inputContainerStyle={{ borderColor: "#38b6ff" }}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="person-circle"
                        size={28}
                        color={"#38b6ff"}
                    />
            }
            />

            <Button
                title="Cambiar nombres y apellidos"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const defaultFormValues = () => {
    return { name: "" }
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
