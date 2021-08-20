import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import firebase from 'firebase/app'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Rating } from 'react-native-elements'
import moment from 'moment/min/moment-with-locales'
import { getDoctorReviews } from '../../utils/Actions'
import { map, size } from 'lodash'
import { ActivityIndicator } from 'react-native'

moment.locale("es") //ESTO ES LO QUE USAREMOS PARA EL DISPLAYNAME

export default function ListReviews({ navigation, idDoctor }) {
    const [userLogged, setUserLogged] = useState(false)
    const [reviews, setReviews] = useState([])

    firebase.auth().onAuthStateChanged((user) => {
        user ? setUserLogged(true) : setUserLogged(false)
    })

    useFocusEffect (
        useCallback(() => {
            (async() => {
                const response = await getDoctorReviews(idDoctor)
                if (response.statusResponse) {
                    setReviews(response.reviews)
                }
            })()
        }, [])
    )

    return (
        <View>
            {
                userLogged ? (
                    <Button
                        buttonStyle={styles.btnAddReview}
                        title="Escribe una opinión"
                        titleStyle={styles.btnTitleAddReview}
                        onPress={() => navigation.navigate("addreview", { idDoctor })}
                        icon={{
                            type: "material-community",
                            name: "square-edit-outline",
                            color: "#38b6ff"
                        }}
                    />
                ) : (
                    <Text 
                        style={styles.mustLoginText}
                        onPress={() => navigation.navigate("Login")}
                    >
                        Para escribir una opinión, debes estar registrado.{" "}  {/* ESTO QUE ESTA EN CORCHETES INDICA QUE HAY UN ESPACIO EN BLANCO. RECUERDA: CORCHETES CON COMILLAS DENTRO, INDICA UN ESPACIO EN BLANCO ENTRE TEXTOS */}
                        <Text style={styles.loginText}>
                            Pulsa aquí para Iniciar Sesión
                        </Text>
                        {/* AGREGAR LA PARTE INICIAL EN DONDE EXPLICAMOS QUE ES DONTRINO Y LA BIENVENIDA (EL APARTADO QUE PONDREMOS EN LA PANTALLA DE INICIO, CUANDO EL USUARIO NO ESTÉ LOGUEADO) */}
                    </Text>
                )
            }
            {
                size(reviews) > 0 && (
                    map(reviews, reviewDocument => (
                        <Review reviewDocument={reviewDocument}/>
                    ))
                )
            }
        </View>
    )
}

//ESTO ES LO QUE USAREMOS PARA EL DISPLAYNAME

function Review({ reviewDocument }) {
    const { title, review, createAt, avatarUser, rating } = reviewDocument
    const createReview = new Date(createAt.seconds * 1000)

    return (
        <View style={styles.viewReview}>
            <View style={styles.imageAvatar}>
                <Avatar
                    renderPlaceholderContent={<ActivityIndicator color="#fff"/>}
                    size="large"
                    rounded
                    containerStyle={styles.imageAvatarUser}
                    source={
                        avatarUser
                            ? { uri: avatarUser }
                            : require("../../assets/avatar-default.jpg")
                    }
                />
            </View>
            <View style={styles.viewInfo}>
                <Text style={styles.reviewTitle}>{title}</Text>
                <Text style={styles.reviewText}>{review}</Text>
                <Rating
                    imageSize={15}
                    startingValue={rating}
                    readonly
                />
                <Text style={styles.reviewDate}>{moment(createReview).format("LLL")} </Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    btnAddReview: {
        backgroundColor: "transparent",
    },

    btnTitleAddReview: {
        color: "#38b6ff"
    },

    mustLoginText: {
        textAlign: "center",
        color: "#38b6ff",
        padding: 20,
    },

    loginText: {
        fontWeight: "bold",
    },

    viewReview: {
        flexDirection: "row",
        padding: 10,
        paddingBottom: 20,
        borderBottomColor: "#e3e3e3",
        borderBottomWidth: 1
    },
    imageAvatar: {
        marginRight: 15
    },
    imageAvatarUser: {
        width: 50,
        height: 50
    },
    viewInfo: {
        flex: 1,
        alignItems: "flex-start"
    },
    reviewTitle: {
        fontWeight: "bold"
    },
    reviewText: {
        paddingTop: 2,
        color: "gray",
        marginBottom: 5
    },
    reviewDate: {
        marginTop: 5,
        color: "gray",
        fontSize: 12,
        position: "absolute",
        right: 0,
        bottom: 0
    }
})
