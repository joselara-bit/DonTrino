import React from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image, Rating } from 'react-native-elements'
import { size } from 'lodash'
import { formatPhone } from '../../utils/Helpers'

export default function ListDoctors({ doctors, navigation, handleLoadMore }) {
    return (
        <View>
            <FlatList
                data={doctors}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={handleLoadMore}
                renderItem={(doctor) => (
                    <Doctor doctor={doctor} navigation={navigation}/>
                )}
            />
        </View>
    )
}

function Doctor({ doctor, navigation, handleLoadMore }) {
    const { id, images, name, rating, address, biography, phone, callingCode, city, especiality, professionallicense } = doctor.item
    const imageDoctor = images[0]

    const goDoctor = () => {
        navigation.navigate("doctor", { id, name })
    }

    return (
        <TouchableOpacity onPress={() => goDoctor()} >
            <View style={styles.viewDoctor}>
                <View style={styles.viewDoctorImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff"/>}
                        source={{ uri: imageDoctor }}
                        style={styles.imageDoctor}
                    />
                </View>
                <View>
                    <Text style={styles.doctorTitle}>Dr(a) {name}</Text> 
                    <Text style={styles.doctorTitle}>{especiality} </Text>
                    <Rating 
                        style={styles.rating}
                        imageSize={20}
                        readonly
                        startingValue={parseFloat(rating)}
                    />
                    <Text style={styles.doctorInformation}>{city}. {address}</Text>
                    <Text style={styles.doctorLlicense}>Cédula Profesional {professionallicense}</Text>
                    <Text style={styles.doctorInformation}>{formatPhone(callingCode, phone)} </Text>
                    <Text style={styles.doctorBiography}>
                        {
                            size(biography) > 0
                                ? `${biography.substr(0, 60)}...`
                                : biography
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    viewDoctor: {
        flexDirection: "row",
        margin: 10,
        marginRight: 330,
    },

    viewDoctorImage: {
        marginRight: 15,
    },

    imageDoctor: {
        width: 90,
        height: 90
    },

    doctorTitle: {
        fontWeight: "bold",
        marginRight: 145,
    },

    doctorInformation: {
        paddingTop: 2,
        color: "grey",
        fontWeight:"bold"
    },

    doctorLlicense: {
        paddingTop: 2,
        color: "grey",
        fontWeight:"bold",
        paddingRight: -50,
    },

    doctorBiography: {
        paddingTop: 2,
        color: "grey",
        width: "75%",
        marginRight: -5,
    },

    rating: {
        paddingRight: 210,
    }
})
