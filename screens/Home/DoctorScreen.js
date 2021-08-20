import React, { useState, useEffect, useCallback, useRef } from 'react'
import { Alert, Dimensions, StyleSheet, Text, View, ScrollView } from 'react-native'
import CarouselImages from '../../components/CarouselImages';
import Loading from '../../components/Loading';
import { 
    getDocumentById, 
    addDocumentWithoutId, 
    getCurrentUser, 
    getIsFavorite, 
    deleteFavorite, 
    setNotificationMessage,
    sendPushNotification 
} from '../../utils/Actions';

import { Icon, ListItem, Rating, Input, Button } from 'react-native-elements'
import { formatPhone, callNumber, sendEmail, sendWhatsapp } from '../../utils/Helpers';
import MapDoctor from '../../components/Doctors/MapDoctor';
import { map } from 'lodash';
import { useFocusEffect } from '@react-navigation/native'
import ListReviews from '../../components/Doctors/ListReviews';
import firebase from 'firebase/app'
import Toast from 'react-native-easy-toast'
import Modal from '../../components/Modal';

const widthScreen = Dimensions.get("window").width

export default function DoctorScreen({ navigation, route }) {
    const { id, name } = route.params
    const toastRef = useRef()
    const [loading, setLoading] = useState(false)

    const [doctor, setDoctor] = useState(null)
    const [activeSlide, setActiveSlide] = useState(0)
    const [isFavorite, setIsFavorite] = useState(false)
    const [userLogged, setUserLogged] = useState(false)
    const [currentUser, setCurrentUser] = useState(null)
    const [modalNotification, setModalNotification] = useState(false)

    firebase.auth().onAuthStateChanged(user => {
        user ? setUserLogged(true) : setUserLogged(false)
        setCurrentUser(user)
    })

    React.useLayoutEffect(() => {
        navigation.setOptions( { title: name } );
    }, []);

    useFocusEffect(
        useCallback(() => {
            (async() => {
                const response = await getDocumentById("doctors", id)
                if (response.statusResponse) {
                    setDoctor(response.document)
                } else {
                    setDoctor({})
                    Alert.alert("Ocurrió un problema cargando el perfil del médico. Intente más tarde.")
                }
            })()
        }, [])
    )

    useEffect(() => {
        (async() => {
            if (userLogged && doctor) {
                const response = await getIsFavorite(doctor.id)
                response.statusResponse && setIsFavorite(response.isFavorite)
            }
        })()
    }, [userLogged, doctor])

    const addFavorite = async() => {
        if (!userLogged) {
            toastRef.current.show("Para agregar al médico a favoritos, debes de estar registrado", 10000)
            return
        }

        setLoading(true)
        const response = await addDocumentWithoutId("favorites", {
            idUser: getCurrentUser().uid,
            idDoctor: doctor.id
        })
        setLoading(false)   
        if (response.statusResponse) {
            setIsFavorite(true)
            toastRef.current.show("El médico se ha agregado a favoritos.", 10000)
        } else {
            toastRef.current.show("No se pudo agregar el médico a favoritos. Intenta más tarde, porfavor.", 10000)
        }

}

    const removeFavorite = async() => {
        setLoading(true)
        const response = await deleteFavorite(doctor.id)
        setLoading(false)

        if (response.statusResponse) {
            setIsFavorite(false)
            toastRef.current.show("El médico se ha eliminado de favoritos.", 10000)
        } else {
            toastRef.current.show("No se pudo eliminar el médico de favoritos. Intenta más tarde, porfavor.", 10000)
        }
    }

    if (!doctor) {
        return <Loading isVisible={true} text="Cargando" />
    }

    return (
        <ScrollView style={styles.viewBody}>
            <CarouselImages
                images={doctor.images}
                height={250}
                width={widthScreen}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
            />
            <View style={styles.viewFavorite}>
                <Icon  
                    type="material-community"
                    name={ isFavorite ? "heart" : "heart-outline"}
                    onPress={isFavorite ? removeFavorite : addFavorite }
                    color="#38b6ff"
                    size={35}
                    underlayColor="transparent"
                />
            </View>
            <NameDoctor
                name={doctor.name}
                professionallicense={doctor.professionallicense}
                biography={doctor.biography}
                rating={doctor.rating}
            />
            <DoctorInfo
                name={doctor.name}
                ills={doctor.ills}
                location={doctor.location}
                address={doctor.address}
                email={doctor.email}
                city={doctor.city}
                professionallicense={doctor.professionallicense}
                especiality={doctor.especiality}
                academictraining={doctor.academictraining}
                medicalexperience={doctor.medicalexperience}
                patient={doctor.patient}
                videocall={doctor.videocall}
                price={doctor.price}
                payments={doctor.payments}
                days={doctor.days}
                hours={doctor.hours}
                city={doctor.city}
                whatsapp={formatPhone(doctor.callingCode, doctor.phone)}
                phone={formatPhone(doctor.callingCode, doctor.phone)}
                currentUser={currentUser}
                callingCode={doctor.callingCode}
                phoneNoFormat={doctor.phone}
                setLoading={setLoading}
                setModalNotification={setModalNotification}
            />
            <ListReviews
                navigation={navigation}
                idDoctor={doctor.id}
            />
            <SendMessage
                modalNotification={modalNotification}
                setModalNotification={setModalNotification}
                setLoading={setLoading}
                doctor={doctor}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text="Espere, porfavor"/>
        </ScrollView>
    )
}

function SendMessage ({ modalNotification, setModalNotification, setLoading, doctor}) {
    const [title, setTitle] = useState(null)
    const [day, setDay] = useState(null)
    const [hour, setHour] = useState(null)
    const [name, setName] = useState(null)
    const [phone, setPhone] = useState(null)
    const [errorName, setErrorName] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorDay, setErrorDay] = useState(null)
    const [errorHour, setErrorHour] = useState(null)
    const [errorTitle, setErrorTitle] = useState(null)
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(null)

    const sendNotification = async() => {
        setLoading(true)
        const resultToken = await getDocumentById("data", getCurrentUser().uid)
        if (!resultToken.statusResponse) {
            setLoading(false)
            Alert.alert("No se pudo obtener al usuario.")
            return
        }

    const userName = `${name}`
    const theMessage = `${message}, está interesada(o) en una consulta contigo ${doctor.name}`
    const number = `${phone}`
    const days = `${days}`
    const hours = `${hours}`

    const messageNotification = setNotificationMessage(
        resultToken.document.token,
        `${userName}, quiere agendar una consulta contigo:`,
        theMessage,
        // `El día ${days}`,
        // `A la hora ${hours}`,
        // `Este es su número telefónico ${number}`,
        { data: theMessage}
    ) 

    const response = await sendPushNotification(messageNotification)
    setLoading(false)

    if (response) {
        Alert.alert("Se ha enviado la notificación.")
    } else {
        Alert.alert("Ocurrió un problema enviando el mensaje.")
    
    }
}

    return (
        <Modal
            isVisible={modalNotification}
            setVisible={setModalNotification}
        >
            <View style={styles.modalContainer}>
                <Text style={styles.textModal}>
                    Agenda una cita con la(el) médico {doctor.name}
                </Text>

                <Input
                    placeholder="Título del mensaje"
                    onChange={(text) => setTitle(text)}
                    value={title}
                    errorMessage={errorTitle}
                />

 {/* ESTO LO USAREMOS PARA AGENDAR CITAS. COMO NO PODEMOS MOSTRAR EL NOMBRE DEL PACIENTE, ENTONCES LE PEDIREMOS SU NOMBRE DESDE ESTE FORMULARIO DEL MODAL. */}

                <Input
                    placeholder="Ingresa tu nombre completo"
                    onChange={(text) => setName(text)}
                    value={name}
                    errorMessage={errorName}
                />

                <Input
                    placeholder="Número telefónico"
                    keyboardType="phone-pad"
                    onChange={(text) => setPhone(text)}
                    value={phone}
                    errorMessage={errorPhone}
                />

                <Text style={styles.textModal}>
                    La(el) médico {doctor.name} se comunicará contigo para validar y acordar la cita.
                </Text>

                <Input
                    placeholder="Mensaje"
                    multiline
                    inputStyle={styles.textArea}
                    onChange={(text) => setTitle(text)}
                    value={message}
                    errorMessage={errorMessage}
                />

                <Input
                    placeholder="¿Cuándo quieres que sea tu consulta?"
                    inputStyle={styles.textArea}
                    onChange={(text) => setDay(text)}
                    value={day}
                    errorMessage={errorDay}
                />

                <Input
                    placeholder="¿A qué hora quieres tu consulta?"
                    inputStyle={styles.textArea}
                    onChange={(text) => setHour(text)}
                    value={hour}
                    errorMessage={errorHour}
                />

                <Button
                    title="Agendar consulta"
                    buttonStyle={styles.btnSend}
                    containerStyle={styles.btnSendContainer}
                    onPress={sendNotification}
                />
            </View>
        </Modal>
    )
}

function DoctorInfo({ 
    name, 
    currentUser, 
    location, 
    address, 
    email, 
    phone, 
    ills, 
    whatsapp, 
    city, 
    professionallicense, 
    especiality, 
    academictraining, 
    medicalexperience, 
    patient, 
    videocall, 
    price, 
    payments, 
    days, 
    hours, 
    callingCode, 
    phoneNoFormat,
    setModalNotification,
}) {

    const listInfo = [
        { type: "address", text: address, iconLeft: "map-marker-radius", subtitle: 'Dirección del consultorio'},
        { type: "city", text: city, iconLeft: "city", subtitle: 'Ciudad'},
        { type: "professionallicense", text: professionallicense, iconLeft: "card-text", subtitle: 'Cédula(s) profesional(es)'},
        { type: "especiality", text: especiality, iconLeft: "doctor", subtitle: 'Especialidad'},
        { type: "academictraining", text: academictraining, iconLeft: "school", subtitle: 'Formación académica'},
        { type: "medicalexperience", text: medicalexperience, iconLeft: "hospital-building", subtitle: 'Experiencia médica'},
        { type: "ills", text: ills, iconLeft: "pill", subtitle: 'Enfermedades tratadas'},
        { type: "patient", text: patient, iconLeft: "account-group", subtitle: 'Pacientes que atiende'},
        { type: "videocall", text: videocall, iconLeft: "video", subtitle: 'Ofrece consultas por videollamada: '},
        { type: "price", text: price, iconLeft: "currency-usd", subtitle: 'Costo de la consulta:'},
        { type: "payments", text: payments, iconLeft: "credit-card-multiple", subtitle: 'Métodos de pago:'},
        { type: "days", text: days, iconLeft: "calendar-month", subtitle: 'Días que ofrece consulta:'},
        { type: "hours", text: hours, iconLeft: "clock-time-ten", subtitle: 'Horario en el que ofrece consulta:'},
        { type: "phone", text: phone, iconLeft: "phone", subtitle: 'Número teléfonico del consultorio:', actionRight: "callPhone", iconRight: "phone-in-talk"},
        { type: "whatsapp", text: whatsapp, iconLeft: "whatsapp", subtitle: 'Número de Whatsapp del médico:', iconRight2: "whatsapp", actionRight2: "sendWhatsapp"},
        { type: "email", text: email, iconLeft: "at", subtitle: 'Correo electrónico del médico:', actionRight: "sendEmail", iconRight: "email-send"},
        { type: "schedule", iconLeft: "calendar-check", subtext: 'Agendar consulta con el médico. Da clic en el ícono de la derecha.', text: "Le llegará una notificación al médico, diciéndole que estás interesada/o", actionRight: "sendEmail", iconRight: "message-text"},
    ]

    const actionRight = (type) => {
        if (type == "phone") {
            callNumber(phone)
        } else if (type == "email") {
            if (currentUser) {
                sendEmail(email, "Interesada/o", `Soy ${currentUser.displayName}. Tengo su contacto mediante la app de DonTrino. Y estoy interesada/o en tener una consulta con usted.`)
            } else {
                sendEmail(email, "Interesada/o", `Estoy interesada/o en tener una consulta con usted.`)
            }
        } else if (type == "schedule") {
            setModalNotification(true)
        }
    }

    const actionRight2 = (type) => {
        if (type == "whatsapp") {
            if (currentUser) {
                sendWhatsapp(`${callingCode} ${phoneNoFormat}`, `Soy ${currentUser.displayName}. Tengo su contacto mediante la app de DonTrino. Y estoy interesada/o en tener una consulta con usted.`)
            } else {
                sendWhatsapp(`${callingCode} ${phoneNoFormat}`, `Estoy interesada/o en tener una consulta con usted.`)
            }
        }
    }

    return (
        <View style={styles.viewDoctorInfo}>
            <Text style={styles.doctorInfoTitle}>
                Información sobre el médico
            </Text>
            
            <MapDoctor
                location={location}
                name={name}
                height={200}
            />

            {
                map(listInfo, (item, index) => (
                    <ListItem
                        key={index}
                        style={styles.containerListItem}
                    >
                        <Icon
                            type="material-community"
                            name={item.iconLeft}
                            color="#38b6ff"
                        />
                        <ListItem.Content>
                        <ListItem.Subtitle>{item.subtitle} {item.subtext}</ListItem.Subtitle>
                            <ListItem.Title>{item.text} </ListItem.Title>
                        </ListItem.Content>
                        {
                            item.iconRight && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight}
                                    color="#38b6ff"
                                    onPress={() => actionRight(item.type)}
                                />
                            )
                        }

                        {
                            item.iconRight2 && (
                                <Icon
                                    type="material-community"
                                    name={item.iconRight2}
                                    color="#38b6ff"
                                    onPress={() => actionRight2(item.type)}
                                />
                            )
                        }
                    </ListItem>
                ))
            }
        </View>
    )
}

function NameDoctor({ 
    name, 
    professionallicense,
    biography, 
    rating 
}) {
    return (
        <View style={styles.viewDoctorName}>
            <Text style={styles.llicenseDoctor}>Cédula(s) Profesional(es): {professionallicense}</Text>
            <View style={styles.viewDoctorContainer}>
                <Text style={styles.nameDoctor}>{name}</Text>
                    <Rating
                        style={styles.rating}
                        imageSize={20}
                        readonly
                        startingValue={parseFloat(rating)}
                    />
            </View>
            <Text style={styles.biographyDoctor}>{biography}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1,
        backgroundColor: "#fff"
    },

    viewDoctorName: {
        padding: 15,
    },

    viewDoctorContainer: {
        flexDirection: "row",
    },

    nameDoctor: {
        fontWeight: "bold",
        fontSize: 25,
        marginRight: 85
    },

    rating: {
        position: "absolute",
        right: 0,
        marginTop: 8,
    },

    biographyDoctor: {
        marginTop: 10,
        color: "black",
        textAlign: "justify",
        fontWeight: "bold"
    },

    viewDoctorInfo: {
        margin: 15,
        marginTop: 25,
    },

    doctorInfoTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 15,
        color: "#38b6ff"
    },

    containerListItem: {
        borderBottomColor: "#38b6ff",
        borderBottomWidth: 1,
    },

     llicenseDoctor: {
        fontWeight: "bold",
        fontSize: 15,
        marginBottom: 8,
    },

    viewFavorite: {
        position: "absolute",
        top: 0,
        right: 0,
        backgroundColor: "#fff",
        borderBottomLeftRadius: 100,
        padding: 10,
        paddingLeft: 15,
    },

    textArea: {
        height: 50,
        paddingHorizontal: 10, 
    },

    btnSend: {
        backgroundColor: "#38b6ff"
    },

    btnSendContainer: {
        width: "95%"
    },

    btnSendContainer: {
        width: "95%"
    },

    textModal: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold"
    },

    modalContainer: {
        justifyContent: "center",
        alignItems: "center"
    }
})
