import { firebaseApp } from './firebase'
import { FireSQL } from 'firesql'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './Helpers'
import { map } from 'lodash'
import * as Notifications from 'expo-notifications'
import Constans from 'expo-constants'
import { Alert } from 'react-native'
import { Platform } from 'react-native'

const db = firebase.firestore(firebaseApp)
const fireSQL = new FireSQL(firebase.firestore(), { includeId: "id" })

export const isUserLogged = () => {
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async (email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo electrónico ya ha sido registrado"
    }
    return result 
}

export const addUser = async(collection, data) => {
    const result = { statusUser: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusUser = false
        result.error = error
    }
    return result     
}

export const loginWithEmailAndPassword = async (email, password) => {
    const result = { statusReponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusReponse = false
        result.error = "Usuario o contraseña inválidos"
    }
    return result 
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }
    const ref = firebase.storage().ref(path).child(name)
    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }
    return result
}

export const updateProfile = async(data) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null }
    const user = getCurrentUser()
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credentials)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getDoctors = async(limitDoctors) => {
    const result = { statusResponse: true, error: null, doctors: [], startDoctor: null }
    try {
        const response = await db
            .collection("doctors")
            .orderBy("createAt", "desc")
            .limit(limitDoctors)
            .get()
        if (response.docs.length > 0) {
            result.startDoctor = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const doctor = doc.data()
            doctor.id = doc.id
            result.doctors.push(doctor)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getMoreDoctors = async(limitDoctors, startDoctor ) => {
    const result = { statusResponse: true, error: null, doctors: [], startDoctor: null }
    try {
        const response = await db
            .collection("doctors")
            .orderBy("createAt", "desc")
            .startAfter(startDoctor.data().createAt)
            .limit(limitDoctors)
            .get()
        if (response.docs.length > 0) {
            result.startDoctor = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const doctor = doc.data()
            doctor.id = doc.id
            result.doctors.push(doctor)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getDocumentById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getDoctorReviews = async(id) => {
    const result = { statusResponse: true, error: null, reviews: [] }
    try {
        const response = await db
            .collection("reviews")
            .where("idDoctor", "==", id)
            .get()
        response.forEach((doc) => {
            const review = doc.data()
            review.id = doc.id
            result.reviews.push(review)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result 
}

export const getIsFavorite = async(idDoctor) => {
    const result = { statusResponse: true, error: null, isFavorite: false}
    try {
       const response = await db
            .collection("favorites")
            .where("idDoctor", "==", idDoctor)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        result.isFavorite = response.docs.length > 0
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}


export const deleteFavorite = async(idDoctor) => {
    const result = { statusResponse: true, error: null }
    try {
       const response = await db
            .collection("favorites")
            .where("idDoctor", "==", idDoctor)
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        response.forEach(async(doc) => {
            const favoriteId = doc.id
            await db.collection("favorites").doc(favoriteId).delete()
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getFavorites = async() => {
    const result = { statusResponse: true, error: null, favorites: [] }
    try {
       const response = await db
            .collection("favorites")
            .where("idUser", "==", getCurrentUser().uid)
            .get()
        await Promise.all(
            map(response.docs, async(doc) => {
                const favorite = doc.data()
                const doctor = await getDocumentById("doctors", favorite.idDoctor)
                if (doctor.statusResponse) {
                    result.favorites.push(doctor.document)
                }
            })
        )
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getTopDoctors = async(limit) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
       const response = await db
            .collection("doctors")
            .orderBy("rating", "desc")
            .limit(limit)
            .get()
        response.forEach((doc) => {
            const doctor = doc.data()
            doctor.id = doc.id
            result.doctors.push(doctor)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

//HACER 4 TIPOS DE BÚSQUEDA, UNO PARA BUSCAR POR EL NOMBRE; OTRO POR LA ENFERMEDAD, OTRO POR CIUDAD, OTRO POR ESPECIALIDAD. ES DECIR, PONER 4 INPUT PARA CADA TIPO DE BÚSQUEDA

export const searchDoctors = async(criteria) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
       result.doctors = await fireSQL.query(`SELECT * FROM doctors WHERE name LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

/* export const searchCities = async(criteria) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
       result.doctors = await fireSQL.query(`SELECT * FROM doctors WHERE city LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const searchIlls = async(criteria) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
       result.doctors = await fireSQL.query(`SELECT * FROM doctors WHERE ills LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const searchEspeciality = async(criteria) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
       result.doctors = await fireSQL.query(`SELECT * FROM doctors WHERE especiality LIKE '${criteria}%'`)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
} */

export const getToken = async() => {
    if (!Constans.isDevice) {
        Alert.alert("Debes tener un dispositivo físico para activar las notificaciones.")
        return
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync()
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
    }

    if (finalStatus !== "granted") {
        Alert.alert("Debes dar permiso para activar las notificaciones.")
        return
    }

    const token = (await Notifications.getExpoPushTokenAsync()).data

    if (Platform.OS == "android") {
        Notifications.setNotificationChannelAsync("default", {
            name: "default",
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: "#FF231F7C"
        })
    }

    return token
}

export const addDocumentWithtId = async(collection, data, doc) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(doc).set(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true
    })
 })

 export const startNotifications = (notificationListener, responseListener) => {
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        console.log(notification)
    })   
    responseListener.current = Notifications.addNotificationResponseReceivedListener(notification => {
        console.log(notification)
    })  
    return () => {
        Notifications.removeNotificationSubscription(notificationListener)
        Notifications.removeNotificationSubscription(responseListener)
    }
 }

export const sendPushNotification = async(message) => {
    let response = false
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    }).then(() => response = true)
    return response
}

export const setNotificationMessage = (token, title, body, data) => {
    const message = {
        to: token,
        sound: "default",
        title: title,
        body: body,
        data: data
    }
  
    return message
}
// PARA VALIDAR QUE EL USUARIO ESTÉ LOGUEADO

/* firebase.auth().onAuthStateChanged((user) => {
    user ? setUserLogged(true) : setUserLogged(false)
}) */

/* export const getNames = async(id) => {
    const result = { statusResponse: true, error: null, doctors: [] }
    try {
        const response = await db
            .collection("users")
            .get()
        response.forEach((doc) => {
            const doctor = doc.data()
            doctor.id = doc.id
            result.doctors.push(doctor)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
} */

// export const addDocumentWithoutId = async(collection, data) => {
//     const result = { statusResponse: true, error: null }
//     try {
//         await db.collection(collection).add(data)
//     } catch (error) {
//         result.statusResponse = false
//         result.error = error
//     }
//     return result     
// }

export const sendEmailResetPassword = async(email) => {
    const result = { statusResponse: true, error: null }
    try {
        await firebase.auth().sendPasswordResetEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}



// MÉTODO PROPIO PARA ELIMINAR UNA COLECCIÓN, ES DECIR, UNA PUBLICACIÓN

export const deleteCollection = async(db, collectionPath, batchSize ) => {
    const collectionRef = db.collection(collectionPath);
    const query = collectionRef.orderBy('__name__').limit(batchSize);
  
    return new Promise((resolve, reject) => {
      deleteQueryBatch(db, query, resolve).catch(reject);
    });
  }