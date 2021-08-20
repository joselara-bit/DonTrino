import { map } from 'lodash'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { StyleSheet, Text, ScrollView } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'
import ChangeEmailForm from './ChangeEmailForm'
import ChangePasswordForm from './ChangePasswordForm'
import { useNavigation } from '@react-navigation/native'

export default function ProfileOptions({ user, toastRef, setReloadUser, }) {
    
    const [showModal, setShowModal] = useState(false)
    const [renderComponent, setRenderComponent] = useState(null)

    const navigation = useNavigation()

    const generateOptions = () => {
        return[
            //HACER OTRO LISTITEM PARA PUBLICAR DOCTOR

            {
                title: "Tus Doctores Favoritos",
                iconNameLeft: "heart",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => navigation.navigate("FavoriteDoctors")
            },

            {
                title: "Top Mejores Doctores",
                iconNameLeft: "star-circle",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => navigation.navigate("TopDoctors")
            },

            {
                title: "Publicar Servicios como Doctor",
                iconNameLeft: "doctor",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => navigation.navigate("Publicar Servicios")
            },

            {
                title: "Editar Publicación como Doctor",
                iconNameLeft: "file-edit",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Ver Agenda",
                iconNameLeft: "calendar-multiple",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Acceder a mi Expediente Clínico",
                iconNameLeft: "file-multiple",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Cambiar Nombres y Apellidos",
                iconNameLeft: "account-circle",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },
    
            {
                title: "Cambiar Correo Electrónico",
                iconNameLeft: "at",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("email")
            },
    
            {
                title: "Cambiar Contraseña",
                iconNameLeft: "lock-reset",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("password")
            },

            {
                title: "¿Cómo Protegemos tus Datos?",
                iconNameLeft: "shield-check",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Soporte",
                iconNameLeft: "help-circle",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Aviso de Privacidad",
                iconNameLeft: "file-document",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => navigation.navigate("Privacy")
            },

            {
                title: "Términos y Condiciones",
                iconNameLeft: "information",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => navigation.navigate("Terms")
            },

            {
                title: "Quejas",
                iconNameLeft: "emoticon-angry",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Comentarios y Sugerencias",
                iconNameLeft: "comment-text-multiple",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

            {
                title: "Acerca de DonTrino",
                iconNameLeft: "redhat",
                iconColorLeft: "#38b6ff",
                iconNameRight: "chevron-right",
                iconColorRight: "#38b6ff",
                onPress: () => selectedComponent("displayName")
            },

        ]
    }

    const selectedComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;

            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email={user.email}
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                        setReloadUser={setReloadUser}
                    />
                )
                break;

            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                        setShowModal={setShowModal}
                        toastRef={toastRef}
                    />
                )
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions()

    return (
        <ScrollView>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />

                    </ListItem>
                ))
            }

            <FlatList>
                
            </FlatList>
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({

    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#38B6FF"
        
    },

})
