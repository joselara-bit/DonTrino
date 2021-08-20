import React, { useState, useRef } from 'react' //EL useRef ES MUY NECESARIO PARA CUANDO USEMOS UN toastRef
import { StyleSheet, Text, View } from 'react-native'
import { AirbnbRating, Button, Input } from 'react-native-elements'
import Toast from 'react-native-easy-toast'
import { isEmpty, size } from 'lodash'
import Loading from '../../components/Loading'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { addDocumentWithoutId, getCurrentUser, getDocumentById, updateDocument } from '../../utils/Actions'

export default function AddReviewDoctor({ navigation, route }) {
    const { idDoctor } = route.params
    const toastRef = useRef()

    const [rating, setRating] = useState(null)
    const [title, setTitle] = useState(null)
    const [errorTitle, setErrorTitle] = useState(null)
    const [review, setReview] = useState(null)
    const [errorReview, setErrorReview] = useState(null)
    const [loading, setLoading] = useState(false)

    //CON ESTO VAMOS A HACER LO DEL NOMBRE DEL USUARIO EN PERFIL

    const addReview = async() => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const user = getCurrentUser()
        const data = {
            idUser: user.uid,
            avatarUser: user.photoURL,
            displayName: user.displayName,
            idDoctor,
            title,
            review,
            rating,
            createAt: new Date()
        }

        const responseAddReview = await addDocumentWithoutId("reviews", data)
        if (!responseAddReview.statusResponse) {
            setLoading(false)
            toastRef.current.show("Error al enviar el comentario, por favor intenta más tarde.", 3000)
            return
        }

        const responseGetDoctor = await getDocumentById("doctors", idDoctor)
        if (!responseGetDoctor.statusResponse) {
            setLoading(false)
            toastRef.current.show("Error al obtener el doctor, por favor intenta más tarde.", 3000)
            return
        }

        const doctor = responseGetDoctor.document
        const ratingTotal = doctor.ratingTotal + rating
        const quantityVoting = doctor.quantityVoting + 1
        const ratingResult = ratingTotal / quantityVoting
        const responseUpdateDoctor = await updateDocument("doctors", idDoctor, {
            ratingTotal,
            quantityVoting,
            rating: ratingResult
        })
        setLoading(false)

        if (!responseUpdateDoctor.statusResponse) {
            toastRef.current.show("Error al actualizar el doctor, por favor intenta más tarde.", 3000)
            return
        }

        navigation.goBack()
    }

    const validForm = () => {
        setErrorTitle(null)
        setErrorReview(null)
        let isValid = true

        if (!rating) {
            toastRef.current.show("Dale una puntuación el médico", 10000)
            isValid = false
        }

        if (isEmpty(title)) {
            setErrorTitle("Ingresa un título a tu opinión.")
            isValid = false
        }

        if (isEmpty(review)) {
            setErrorReview("Ingresa una opinión.")
            isValid = false
        }

        if (size(review) < 30) {
            setErrorReview("Ingresa al menos 30 caracteres a tu opinión.")
            isValid = false
        }

        return isValid
    }

    return (
        <KeyboardAwareScrollView style={styles.viewBody}>
            <View style={styles.viewRating}>
                <AirbnbRating
                    count={5}
                    reviews={[ "Malo", "Regular", "Normal", "Bueno", "Excelente" ]}
                    defaultRating={0}
                    size={35}
                    onFinishRating={(value) => setRating(value)}
                />
            </View>
            <View style={styles.formView}>
                <Input
                    placeholder="Título"
                    containerStyle={styles.input}
                    onChange={(e) => setTitle(e.nativeEvent.text)}
                    errorMessage={errorTitle}
                />

                <Input
                    placeholder="Cuéntanos tu opinión"
                    containerStyle={styles.input}
                    style={styles.textArea}
                    multiline
                    onChange={(e) => setReview(e.nativeEvent.text)}
                    errorMessage={errorReview}
                />

                <Button
                    title="Publicar opinión"
                    containerStyle={styles.btnContainer}
                    buttonStyle={styles.btn}
                    onPress={addReview}
                />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Publicando opinión"/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
    },

    viewRating: {
        height: 110,
        backgroundColor: "#f2f2f2"
    },

    formReview: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems:"center",
        margin: 10,
        marginTop: 40
    },

    input: {
        marginBottom: 10,
    },

    textArea: {
        height: 150,
        width: "100%",
        padding: 0,
        margin: 0,
    },

    btnContainer: {
        justifyContent: 'center',
        alignSelf: "center",
        width: "95%",
        marginTop: 10,
    },

    btn: {
        backgroundColor: "#38b6ff"
    },
})
