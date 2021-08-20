import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Card, Image, Icon, Rating} from 'react-native-elements'

export default function ListTopDoctors({ doctors, navigation }) {
    return (
        <FlatList 
            data={doctors}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(doctor) => (
                <Doctor
                    doctor={doctor}
                    navigation={navigation}
                />
            )}
        />
    )
}

// CON ESTO SE PUEDE HACER LO DEL NOMBRE EN InfoUser

//LAS FUNCTIONS VAN SIEMPRE DESPUÉS DEL EXPORT DEFAULT

function Doctor({ doctor, navigation }) {
    const { name, rating, images, biography, id, city, especiality } = doctor.item
    const [iconColor, setIconColor] = useState("#000")

    useEffect(() => {
        if (doctor.index === 0) {
            setIconColor("#efb819")
        } else if (doctor.index === 1) {
            setIconColor("#e3e4e5")
        } else if (doctor.index === 2) {
            setIconColor("#cd7f32")
        }
    }, [])
    
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate("Inicio", {
                screen: "doctor",
                params: { id, name }
            })}
        >
            <Card containerStyle={styles.containerCard}> 

                <Icon
                    type="material-community"
                    name="chess-queen"
                    color={iconColor}
                    size={40}
                    containerStyle={styles.containerIcon}
                />

                <Image
                    style={styles.doctorImage}
                    resizeMode="cover"
                    PlaceholderContent={<ActivityIndicator size="large" color="#fff"/>}    
                    source={{ uri: images[0] }}
                />

                <View style={styles.titleRating}>
                    <Text style={styles.title}>{name}</Text>
                    <Rating
                        imageSize={20}
                        startingValue={rating}
                        readonly
                    />
                    <Text style={styles.subtitle}>Especialidad: {especiality}</Text>
                    <Text style={styles.subtitle}>Ciudad: {city}</Text>
                </View>

                <Text style={styles.description}>{biography}</Text>
            </Card>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    containerStyle: {
        marginBottom: 30,
        width: 0,
    },

    containerIcon: {
        position: "absolute",
        top: -30,
        left: -30,
        zIndex: 1,
    },

    doctorImage: {
        width: "100%",
        height: 200,
    },

    title: {
        fontSize: 20,
        fontWeight: "bold",
    },

    subtitle: {
        fontSize: 15,
        fontWeight: "bold",
    },

    description: {
        color: "grey",
        marginTop: 0,
        textAlign: "justify"
    },

    //MARGIN VERTICAL ES PARA ARRIBA Y ABAJO

    // titleRating: {
    //     flexDirection: "row",
    //     marginTop: -10,
    //     justifyContent: "space-between"
    // }
})
