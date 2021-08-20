import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native'
import { SearchBar, ListItem, Icon, Image} from 'react-native-elements'
import { isEmpty, size } from 'lodash'
import { searchDoctors, searchCities, searchIlls, searchEspeciality } from '../utils/Actions'

export default function SearchScreen({ navigation }) {
    const [search, setSearch] = useState("")
    const [search2, setSearch2] = useState("")
    const [doctors, setDoctors] = useState([])

    //ES MUY PROBABLE QUE PONGAMOS UN FILTRO, ESO LO CHECAREMOS CUANDO HAGAMOS EL ESTILO FIÇNAL DE LA APP

    useEffect(() => {
        if (isEmpty(search)) {
            return
        }

        async function getData() {
            const response = await searchDoctors(search)
            if (response.statusResponse) {
                setDoctors(response.doctors)
            }
        }
        getData();
    }, [search])

    return (
        <View>
            <SearchBar
                onClear={true}
                round={true}
                showCancel={true}
                searchIcon={{ color: "#fff" }}
                leftIconContainerStyle={{ color: "#fff"}}
                placeholderTextColor={"#fff"}
                inputStyle={{ color: "#fff"}}
                inputContainerStyle={styles.input}
                placeholder="Buscar nombre, especialidad, ciudad ó padecimientos..."
                onChangeText={(e) => setSearch(e)}
                containerStyle={styles.searchBar}
                value={search}
            />
            {
                size(doctors) > 0 ? (
                    <FlatList
                        data={doctors}
                        keyExtractor={(item, index) => index.toString()}    //nos salva de un error
                        renderItem={(doctor) => 
                            <Doctor
                                doctor={doctor}
                                navigation={navigation}
                            />
                        }
                    />
                ) : (
                    isEmpty(search) ? (
                        <Text style={styles.notFound} >
                            Haz una búsqueda...
                        </Text>
                    ) : (
                        <Text style={styles.notFound}>
                            No hay médicos que coincidan con el criterio de búsqueda
                        </Text>
                    )
                )
            }
        </View>
    )
}

function Doctor ({ doctor, navigation }) {
    const { id, name, images, especiality, city, biography, ills } = doctor.item
    
    return (
        <ListItem
            style={styles.menuItem}
            onPress={() => navigation.navigate("Inicio", {
                screen: "doctor", 
                params: { id, name }
            })}
        >
            <Image
                resizeMode= "cover"
                PlaceholderContent={<ActivityIndicator color="#fff"/>}
                source={{ uri: images[0] }}
                style={styles.imageDoctor}
            />
            <ListItem.Content>
                <ListItem.Title>{name}</ListItem.Title>
                <ListItem.Title>{especiality}</ListItem.Title>
                <ListItem.Title>{city}</ListItem.Title>
                <ListItem.Subtitle>
                       Enfermedades Tratadas:  {ills}
                </ListItem.Subtitle>
                <ListItem.Subtitle>
                        {
                            size(biography) > 0
                                ? `${biography.substr(0, 60)}...`
                                : biography
                        }
                </ListItem.Subtitle>
            </ListItem.Content>
            <Icon
                type="material-community"
                name="chevron-right"    
            />
        </ListItem>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginBottom: 5,
        marginTop: 5,
        backgroundColor: "#38b6ff",
    },

    imageDoctor: {
        width: 90,
        height: 90,
    },

    notFound: {
        alignSelf: "center",
        width: "90%"
    },

    menuItem: {
        margin: 10,
        paddingBottom: 60,   
    },

    input: {
        backgroundColor: "#38b6ff",
        color: "#fff",
    }
})
