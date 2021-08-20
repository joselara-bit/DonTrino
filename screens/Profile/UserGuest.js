import React from 'react'
import { StyleSheet, Image, Text, View, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()


    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/DonTrino.png")}
                resizeMode="contain"
                style={styles.image}
            />

            <Text style={styles.title}>¡Regístrate en DonTrino!</Text>
            <Text style={styles.description}>Encuentra en DonTrino a los mejores doctores y especialistas de toda la república. Sólo regístrate y no te pierdas de todas las funciones y sorpresas que DonTrino tiene para ti.</Text>
            <Text style={styles.description}> Si eres doctor, podrás anunciar tus servicios en DonTrino ¿Qué esperas? Sé parte de DonTrino ¡Hoy mismo!</Text>
            <Button
                buttonStyle={styles.button}
                title="Iniciar Sesión"
                onPress={() => navigation.navigate("Login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        backgroundColor: "#38b6ff",
        marginHorizontal: 0,
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
        marginVertical: 50,
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginVertical: -90,
        marginBottom: 80,
        textAlign: "center",
        color: "#fff",

    },
    description: {
        textAlign: "justify",
        marginVertical: -50,
        marginBottom: 70,
        color: "#fff"
    },
    button: {
        backgroundColor: "#038fdf",
        marginHorizontal: 30,
    },
})
