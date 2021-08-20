import React, {useState, useRef} from 'react'
import { isEmpty, size } from 'lodash'
import { StyleSheet, Text, View } from 'react-native'
import { Input, Icon, Button } from 'react-native-elements'
import { validateEmail } from '../../utils/Helpers'
import { useNavigation } from '@react-navigation/native'
import { registerUser, addUser, getToken, addDocumentWithtId, getCurrentUser } from '../../utils/Actions'
import Loading from '../Loading'

export default function RegisterForm({ email, toastRef }) {
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState("")
    const [errorDisplayName, setErrorDisplayName] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = ( e, type ) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text})
    }

    const doRegisterUser = async() => {
        if (!validateData()) {
            return;
        } 

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        const user = {
            email: formData.email,  
            displayName: formData.displayName
        }
        const responseAddUser = await addUser("users", { user }, getCurrentUser().uid)
            
            if (!result.statusResponse) {
                setLoading(false)
                setErrorEmail(result.error)
                return
            }

            if (!responseAddUser.statusUser) {
                toastRef.current.show("Hubo un error al guardar tu usuario. Inténtalo más tarde, porfavor.", 3000)
                return
            }

            const token = await getToken()
            const resultUser = await addDocumentWithtId("data", { token }, getCurrentUser().uid)
            if (!resultUser.statusResponse) {
                setLoading(false)
                setErrorEmail(result.error)
                return
            }
            setLoading(false)
            navigation.navigate("Perfil")
    }

    const validateData = () => {
        setErrorDisplayName("")
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true
        
        if(!validateEmail(formData.email)) {
            setErrorEmail("Ingresa un correo electrónico válido.")
            isValid = false
        }

        if(isEmpty(formData.password)) {
            setErrorPassword("Ingresa una contraseña.")
            isValid = false
        }

        if(size(formData.password) < 6) {
            setErrorPassword("Ingresa una contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(isEmpty(formData.displayName)) {
            setErrorDisplayName("Ingresa tu nombre completo.")
            isValid = false
        }

        if(size(formData.displayName) < 15) {
            setErrorDisplayName("Ingresa tu nombre completo.")
            isValid = false
        }

        if(size(formData.confirm) < 6) {
            setErrorConfirm("Ingresa una contraseña de al menos 6 carácteres.")
            isValid = false
        }

        if(formData.password !== formData.confirm) {
            setErrorPassword("La confirmación no coincide con la contraseña.")
            setErrorConfirm("La confirmación no coincide con la contraseña.")
            isValid = false
        }

        return isValid
    }

    return (
        <View style={styles.form}>

            <Text style={styles.text}>Su nombre completo</Text>

            <Input
                placeholder="Nombre completo"
                placeholderTextColor="#fff"
                onChange={(e) => onChange(e, "displayName")}
                containerStyle={styles.input}
                style={styles.textInput}
                errorMessage={errorDisplayName}
                defaultValue={formData.displayName}
                inputContainerStyle={{ borderColor: "#fff" }}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="email"
                        size={28}
                        iconStyle={styles.iconLeft}
                    />
            }
            />

            <Text style={styles.text}>Su correo electrónico</Text>

            <Input
                placeholder="Correo electrónico"
                placeholderTextColor="#fff"
                keyboardType="email-address"
                onChange={(e) => onChange(e, "email")}
                containerStyle={styles.input}
                style={styles.textInput}
                errorMessage={errorEmail}
                defaultValue={formData.email}
                inputContainerStyle={{ borderColor: "#fff" }}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="email"
                        size={28}
                        iconStyle={styles.iconLeft}
                    />
            }
            />

            <Text style={styles.text}>Su contraseña</Text>

            <Input
                placeholder="Contraseña"
                placeholderTextColor="#fff"
                onChange={(e) => onChange(e, "password")}
                password={true}
                secureTextEntry={!showPassword}
                containerStyle={styles.input}
                style={styles.textInput}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                inputContainerStyle={{ borderColor: "#fff" }}
                rightIcon={
                    <Icon
                        type="ionicon"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        size={27}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
            }
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="ios-lock-closed"
                        size={28}
                        iconStyle={styles.iconLeft}
                    />
            }
            />

            <Text style={styles.text}>Confirmar contraseña</Text>  

            <Input
                placeholder="Confirma tu contraseña"
                placeholderTextColor="#fff"
                onChange={(e) => onChange(e, "confirm")}
                password={true}
                secureTextEntry={!showPassword}
                containerStyle={styles.input}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                style={styles.textInput}
                inputContainerStyle={{ borderColor: "#fff" }}
                rightIcon={
                    <Icon
                        type="ionicon"
                        name={ showPassword ? "eye-off-outline" : "eye-outline"}
                        size={27}
                        iconStyle={styles.icon}
                        onPress={() => setShowPassword(!showPassword)}
                    />
            }
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="lock-closed"
                        size={28}
                        iconStyle={styles.iconLeft}
                    />
            }
            />

            <Button
                title="Registrar nuevo usuario" 
                placeholderTextColor="#fff"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                inputContainerStyle={{ borderColor: "#fff" }}
                onPress={() => doRegisterUser()}
            />

            <Loading
                isVisible={loading} text="Creando usuario..."
            />
        </View>
    )
}

const defaultFormValues = () => {
    return { displayName: "", email: "", password: "", confirm: ""}
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        paddingHorizontal: 10,
    },

    textInput: {
        color: '#fff',
        fontSize: 17,
    },

    input: {
        width: "92%",
        color: "#fff"
    },

    btnContainer: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
    },

    btn: {
        backgroundColor: "#038fdf",
        marginHorizontal: 30,
        marginBottom: 40,
    },

    text: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 22,
        marginLeft: 8,
    },

    icon: {
        color: "#fff",
    },

    iconLeft: {
        color: "#fff",
        marginRight: 1,
    }
})
