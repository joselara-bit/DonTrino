import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, Alert, Dimensions } from 'react-native'
import { Input, Button, Icon, Avatar, Image } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/Helpers'
import Modal from '../../components/Modal'
import MapView from 'react-native-maps'
import {getCurrentUser, uploadImage, addDocumentWithoutId} from '../../utils/Actions'
import uuid from 'random-uuid-v4'

const widthScreen = Dimensions.get("window").width

export default function PostDoctorForm({ toastRef, setLoading, navigation, email }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorName, setErrorName] = useState(null)
    const [errorBiography, setErrorBiography] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorIlls, setErrorIlls] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorWhatsapp, setErrorWhatsapp] = useState(null)
    const [errorProfessionallicense, setErrorProfessionallicense] = useState(null)
    const [errorEspeciality, setErrorEspeciality] = useState(null)
    const [errorAcademictraining, setErrorAcademictraining] = useState(null)
    const [errorMedicalexperience, setErrorMedicalexperience] = useState(null)
    const [errorAge, setErrorAge] = useState(null)
    const [errorPatient, setErrorPatient] = useState(null)
    const [errorCity, setErrorCity] = useState(null)
    const [errorRfc, setErrorRfc] = useState(null)
    const [errorVideocall, setErrorVideocall] = useState(null)
    const [errorPayments, setErrorPayments] = useState(null)
    const [errorPrice, setErrorPrice] = useState(null)
    const [errorDays, setErrorDays] = useState(null)
    const [errorHours, setErrorHours] = useState(null)
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [postEmail, setPostEmail] = useState(email)
    const [locationDoctor, setLocationDoctor] = useState(null)

    const [imagesSelected, setImagesSelected] = useState([])

    const addDoctor = async() => {
        if (!validForm()) {
            return
        }

        setLoading(true)
        const responseUploadImages = await uploadImages()
        const doctor = {
            name: formData.name,
            biography: formData.biography,
            email: formData.email,
            ills: formData.ills,
            address: formData.address,
            phone: formData.phone,
            academictraining: formData.academictraining,
            professionallicense: formData.professionallicense,
            whatsapp: formData.whatsapp,
            especiality: formData.especiality,
            patient: formData.patient,
            medicalexperience: formData.medicalexperience,
            age: formData.age,
            city: formData.city,
            rfc: formData.rfc,
            callingCode: formData.callingCode,
            location: locationDoctor,
            images: responseUploadImages,
            payments: formData.payments,
            videocall: formData.videocall,
            price: formData.price,
            hours: formData.hours,
            days: formData.days,
            rating: 0,
            ratingTotal: 0,
            quantityVoting: 0,
            createAt: new Date(),
            createBy: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentWithoutId("doctors", doctor)
        setLoading(false)

        if (!responseAddDocument.statusResponse) {
            toastRef.current.show("Hubo un error al guardar tu publicación. Inténtalo más tarde, porfavor.", 3000)
            return
        }

        navigation.navigate("Inicio")
    }

    const uploadImages = async() => {
        const imagesUrl = []
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "doctors", uuid())
                if (response.statusResponse) {
                   imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }

    const validForm = () => {
        clearErrors()
        let isValid = true

        if(!postEmail === email) {
            setErrorEmail("Ingresa el mismo correo electrónico al actual.")
            isValid = false
        }

        if (isEmpty(formData.name)) {
            setErrorName("Ingresa tu nombre(s).")
            isValid = false
        }

        if(size(formData.name) < 15) {
            setErrorName("Ingresa tu nombre completo.")
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail("Ingresa un correo electrónico válido.")
            isValid = false
        }

        if (isEmpty(formData.address)) {
            setErrorAddress("Ingresa la dirección de tu consultorio.")
            isValid = false
        }

        if (isEmpty(formData.biography)) {
            setErrorBiography("Ingresa tu biografía.")
            isValid = false
        }

        if(size(formData.biography) < 30) {
            setErrorBiography("Ingresa al menos 30 carácteres a tu biografía.")
            isValid = false
        }

        if(size(formData.phone) < 10) {
            setErrorPhone("Ingresa un número teléfonico válido.")
            isValid = false
        }

        if(size(formData.whatsapp) < 10) {
            setErrorWhatsapp("Ingresa un número de Whatsapp válido.")
            isValid = false
        }

        if (isEmpty(formData.phone)) {
            setErrorPhone("Ingresa el número telefónico de tu consultorio.")
            isValid = false
        }

        if (isEmpty(formData.whatsapp)) {
            setErrorWhatsapp("Ingresa tu número de Whatsapp.")
            isValid = false
        }

        if(size(formData.age) < 2) {
            setErrorAge("Ingresa al menos 2 carácteres.")
            isValid = false
        }

        if (isEmpty(formData.age)) {
            setErrorAge("Ingresa tu edad.")
            isValid = false
        }

        if(size(formData.professionallicense) < 7) {
            setErrorProfessionallicense("Ingresa tu cédula profesional completa.")
            isValid = false
        }

        if (isEmpty(formData.professionallicense)) {
            setErrorProfessionallicense("Ingresa tu cédula profesional.")
            isValid = false
        }

        if(size(formData.especiality) < 6) {
            setErrorEspeciality("Ingresa tu especialidad correctamente.")
            isValid = false
        }

        if (isEmpty(formData.especiality)) {
            setErrorEspeciality("Ingresa tu especialidad médica.")
            isValid = false
        }

        if(size(formData.academictraining) < 30) {
            setErrorAcademictraining("Ingresa al menos 30 carácteres a tu formación académica.")
            isValid = false
        }

        if (isEmpty(formData.academictraining)) {
            setErrorAcademictraining("Ingresa tu formación académica.")
            isValid = false
        }

        if(size(formData.medicalexperience) < 30) {
            setErrorMedicalexperience("Ingresa al menos 30 carácteres a tu experiencia médica.")
            isValid = false
        }

        if (isEmpty(formData.academictraining)) {
            setErrorAcademictraining("Ingresa tu formación académica.")
            isValid = false
        }

        if(size(formData.ills) < 10) {
            setErrorIlls("Ingresa al menos 10 carácteres para describir las enfermedades que has tratado.")
            isValid = false
        }

        if (isEmpty(formData.ills)) {
            setErrorIlls("Ingresa las enfermedades que has tratado.")
            isValid = false
        }

        if(size(formData.city) < 5) {
            setErrorCity("Ingresa el nombre de tu ciudad correctamente.")
            isValid = false
        }

        if (isEmpty(formData.city)) {
            setErrorCity("Ingresa el nombre de tu ciudad.")
            isValid = false
        }

        if (isEmpty(formData.videocall)) {
            setErrorVideocall("Ingresa un SÍ, si aceptas consultas por videollamada. Ingresa un NO, si no aceptas consultas por videollamada.")
            isValid = false
        }

        if (isEmpty(formData.payments)) {
            setErrorPayments("Ingresa al menos un método de pago.")
            isValid = false
        }

        if (isEmpty(formData.price)) {
            setErrorPrice("Ingresa el monto monetario de tu consulta.")
            isValid = false
        }

        if (isEmpty(formData.patient)) {
            setErrorPatient("Ingresa el tipo de paciente que atiendes.")
            isValid = false
        }

        if (isEmpty(formData.days)) {
            setErrorDays("Ingresa los días en los que das consultas.")
            isValid = false
        }

        if (isEmpty(formData.hours)) {
            setErrorHours("Ingresa el horario en el que das consultas.")
            isValid = false
        }

        if (!locationDoctor) {
            toastRef.current.show("Localiza tu consultorio en el mapa. Presionando al ícono de ubicación con color gris en el apartado de Dirección del restaurante.", 5000)
            isValid = false
        } else if(size(imagesSelected) === 0) {
            toastRef.current.show("Ingresa al menos una imagen a tu publicación. Presionando al icóno inferior de la cámara dentro del recuadro azul.", 5000)
            isValid = false
        }

        return isValid
    }

    const clearErrors = () => {
        setErrorName(null)
        setErrorBiography(null)
        setErrorEmail(null)
        setErrorIlls(null)
        setErrorAddress(null)
        setErrorPhone(null)
        setErrorProfessionallicense(null)
        setErrorWhatsapp(null)
        setErrorEspeciality(null)
        setErrorAcademictraining(null)
        setErrorMedicalexperience(null)
        setErrorAge(null)
        setErrorCity(null)
        setErrorPatient(null)
        setErrorRfc(null)
        setErrorPrice(null)
        setErrorDays(null)
        setErrorHours(null)
        setErrorVideocall(null)
        setErrorPayments(null)
    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageDoctor
                imageDoctor={imagesSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorBiography={errorBiography}
                errorEmail={errorEmail}
                errorIlls={errorIlls}
                errorAddress={errorAddress}
                errorPhone={errorPhone}
                errorProfessionallicense={errorProfessionallicense}
                errorWhatsapp={errorWhatsapp}
                errorEspeciality={errorEspeciality}
                errorAcademictraining={errorAcademictraining}
                errorMedicalexperience={errorMedicalexperience}
                errorAge={errorAge}
                errorCity={errorCity}
                errorRfc={errorRfc}
                errorVideocall={errorVideocall}
                errorPayments={errorPayments}
                errorPrice={errorPrice}
                errorDays={errorDays}
                errorHours={errorHours}
                errorPatient={errorPatient}
                setIsVisibleMap={setIsVisibleMap}
                locationDoctor={locationDoctor}
            />
            <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
            />
            <Button
                title="Crear Publicación"
                onPress={addDoctor}
                buttonStyle={styles.btnAddDoctor}
            />
            <MapDoctor
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationDoctor={setLocationDoctor}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapDoctor({ 
    isVisibleMap, 
    setIsVisibleMap, 
    setLocationDoctor, 
    toastRef, 
}) {
    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        (async() => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)
            }
        })()
    }, [])
    
    const confirmLocation = () => {
        setLocationDoctor(newRegion)
        toastRef.current.show("Localización guardada exitosamente.", 10000)
        setIsVisibleMap(false)
    }

    return (
        <Modal isVisible={isVisibleMap} setVisible={setIsVisibleMap}>
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle} 
                            initialRegion={newRegion}
                            showsUserLocation={true}
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            />

                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicación"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress={confirmLocation}
                    />

                    <Button
                        title="Cancelar Ubicación"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />  
                </View>

            </View>
        </Modal>
    )
}

function ImageDoctor({ imageDoctor }) {
    return (
        <View style={styles.viewPhoto}>
            <Image
            style={{ width: widthScreen, height: 200 }}
                source={
                    imageDoctor
                        ? { uri: imageDoctor }
                        : require("../../assets/no-image.png")
                }        
            />
        </View>
    )
}

function UploadImage({ toastRef, imagesSelected, setImagesSelected }) {
    const imageSelect = async() => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show("No has seleccionado ninguna imagen", 3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert (
            "Eliminar Imagen",
            "¿Estás segura/o de que quieres eliminar la imagen seleccionada?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                
                {
                    text: "Sí",
                    onPress: () => {
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl !== image)
                        )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imagesSelected) < 10 && (
                    <Icon
                        type="ionicon"
                        name="camera"
                        color="#fff"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imagesSelected, (imageDoctor, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageDoctor}}
                        onPress={() => removeImage(imageDoctor)}
                    />
                ))
            }

        </ScrollView>
    )
}

function FormAdd({ 
    formData, 
    setFormData, 
    errorName, 
    errorPatient,
    errorDays,
    errorHours, 
    errorProfessionallicense, 
    errorBiography, 
    errorEmail, 
    errorIlls, 
    errorAddress, 
    errorPhone, 
    errorWhatsapp, 
    errorEspeciality, 
    errorAcademictraining, 
    errorMedicalexperience, 
    errorAge, 
    errorCity, 
    errorRfc, 
    errorPrice,
    errorVideocall,
    errorPayments,
    setIsVisibleMap,
    locationDoctor
}) {
    const [country, setCountry] = useState("MX")
    const [callingCode, setCallingCode] = useState("52")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre Completo"
                containerStyle={styles.textArea}
                containerStyle={styles.name}
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="ios-person-circle"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />

            <Input
                keyboardType="email-address"
                placeholder="Correo electrónico"
                containerStyle={styles.textArea}
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="mail"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    withEmoji
                    withAlphaFilter
                    withCloseButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({ 
                            ...formData, 
                            "country": country.cca2, 
                            "callingCode": country.callingCode[0]
                        })
                    }}
                />

            <Input
                keyboardType="phone-pad"
                placeholder="Número teléfonico del consultorio"
                containerStyle={styles.inputPhone}
                defaultValue={formData.phone}
                onChange={(e) => onChange(e, "phone")}
                errorMessage={errorPhone}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="call"
                        size={26}
                        iconStyle={styles.iconLeft}
                    />
            }
            />    

            </View>

            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    withEmoji
                    withAlphaFilter
                    withCloseButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({ 
                            ...formData, 
                            "country": country.cca2, 
                            "callingCode": country.callingCode[0]
                        })
                    }}
                />

            <Input
                keyboardType="phone-pad"
                placeholder="Whatsapp del médico (opcional)"
                containerStyle={styles.inputPhone}
                defaultValue={formData.whatsapp}
                onChange={(e) => onChange(e, "whatsapp")}
                errorMessage={errorWhatsapp}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="logo-whatsapp"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            </View>

            <Input
                keyboardType="number-pad"
                placeholder="Edad"
                containerStyle={styles.textArea}
                defaultValue={formData.age}
                onChange={(e) => onChange(e, "age")}
                errorMessage={errorAge}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="person-circle"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />      

            <Input
                placeholder="Cédula(s) profesional(es)"
                containerStyle={styles.textArea}
                defaultValue={formData.professionallicense}
                onChange={(e) => onChange(e, "professionallicense")}
                errorMessage={errorProfessionallicense}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="card-text"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />      

            <Input
                placeholder="Especialidad"
                containerStyle={styles.textArea}
                defaultValue={formData.especiality}
                onChange={(e) => onChange(e, "especiality")}
                errorMessage={errorEspeciality}
                leftIcon={
                    <Icon
                        type="fontisto"
                        name="doctor"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="Biografía del médico"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.biography}
                onChange={(e) => onChange(e, "biography")}
                errorMessage={errorBiography}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="document-text"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="Formación (antecedentes académicos)"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.academictraining}
                onChange={(e) => onChange(e, "academictraining")}
                errorMessage={errorAcademictraining}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="school"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="Experiencia médica"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.medicalexperience}
                onChange={(e) => onChange(e, "medicalexperience")}
                errorMessage={errorMedicalexperience}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="hospital-building"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="Enfermedades tratadas"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.ills}
                onChange={(e) => onChange(e, "ills")}
                errorMessage={errorIlls}
                leftIcon={
                    <Icon
                        type="fontisto"
                        name="doctor"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            /> 

            <Input
                placeholder="¿Qué tipo de pacientes atiendes? Ejemplo: niños, adultos, adultos mayores, etc."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.patient}
                onChange={(e) => onChange(e, "patient")}
                errorMessage={errorPatient}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="ios-people-circle"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />   

            <Input
                placeholder="¿De qué ciudad eres?"
                containerStyle={styles.textArea}
                defaultValue={formData.city}
                onChange={(e) => onChange(e, "city")}
                errorMessage={errorCity}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="map-marker-radius"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />   

            <Input
                placeholder="Direción del consultorio"
                containerStyle={styles.textArea}
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                multiline
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationDoctor ? "#38b6ff" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}

                leftIcon={
                    <Icon
                        type="material-community"
                        name="map-marker-radius"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />    

            <Input
                placeholder="¿Ofreces consulta por videollamada? Pon SÍ o NO"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.videocall}
                onChange={(e) => onChange(e, "videocall")}
                errorMessage={errorVideocall}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="videocam"
                        size={26}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="¿Qué días ofreces consultas?"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.days}
                onChange={(e) => onChange(e, "days")}
                errorMessage={errorDays}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="calendar"
                        size={26}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="¿En qué horario ofreces consulta?"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.hours}
                onChange={(e) => onChange(e, "hours")}
                errorMessage={errorHours}
                leftIcon={
                    <Icon
                        type="ionicon"
                        name="calendar"
                        size={26}
                        iconStyle={styles.iconLeft}
                    />
            }
            />  

            <Input
                placeholder="¿Cuál es el costo de tu consulta?"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.price}
                onChange={(e) => onChange(e, "price")}
                errorMessage={errorPrice}
                keyboardType="numeric"
                leftIcon={
                    <Icon
                        type="fontawesome5"
                        name="payments"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />    

            <Input
                placeholder="¿Qué métodos de pago aceptas? Por ejemplo: efectivo, tarjeta, PayPal..."
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.payments}
                onChange={(e) => onChange(e, "payments")}
                errorMessage={errorPayments}
                leftIcon={
                    <Icon
                        type="fontawesome5"
                        name="payments"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />              

            <Input
                placeholder="RFC (Sólo en caso de querer factura)"
                defaultValue={formData.rfc}
                onChange={(e) => onChange(e, "rfc")}
                errorMessage={errorRfc}
                leftIcon={
                    <Icon
                        type="material-community"
                        name="card-account-details"
                        size={27}
                        iconStyle={styles.iconLeft}
                    />
            }
            />         

            </View>
    )
}

const defaultFormValues = () => {
    return { 
        name: "",
        email: "",
        phone: "",
        whatsapp: "",
        professionallicense: "",
        country: "MX",
        callingCode: "52",
        especiality: "",
        biography: "",
        academictraining: "",
        medicalexperience: "",
        patient: "",
        ills: "",
        age: "",
        city: "",
        price: "",
        rfc: "",
        days: "",
        hours: "",
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%",
    },

    viewForm: {
        marginHorizontal: 10,
    },

    textArea: {
        height: 75,
        width: "100%",
    },

    phoneView: {
        width: "100%",
        flexDirection: "row"
    },

    inputPhone: {
        width: "100%",
        marginTop: -10,
    },

    btnAddDoctor: {
        margin: 20,
        backgroundColor: "#38b6ff"
    },

    name: {
        marginTop: 20,
    },

    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },

    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#38b6ff"
    },

    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10,
    },

    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20,
    },

    mapStyle: {
        width: "100%",
        height: 550,
    },

    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10,
    },

    viewMapBtnContainerCancel: {
        paddingLeft: 5,
    },

    viewMapBtnContainerSave: {
        paddingRight: 5,
    },

    viewMapBtnCancel: {
        backgroundColor: "red"
    },

    viewMapBtnContainerSave: {
        backgroundColor: "#38b6ff"
    },

    iconLeft: {
        color: "#38b6ff",
        marginRight: 1,
    }
})