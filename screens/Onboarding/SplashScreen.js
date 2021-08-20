import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'

const SplashScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/DonTrinoSplash.png')}
            resizeMode="stretch"
        />
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.title}>¡Bienvenida/o a DonTrino!</Text>
            <Text style={styles.text}>DonTrino es una aplicación que conecta doctores con pacientes. Podrás tener y pagar consultas con el doctor de tu preferencia. Está pensada para facilitar la salud en todo México. Al igual de ayudar a los doctores a tener una cartera de clientes.</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('SplashScreen2')}>
                <LinearGradient
                    colors={['#38b6ff', '#38b6ff']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Continuar</Text>
                    <MaterialIcons
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
        </View>
    );
  };

export default SplashScreen;

const { height } = Dimensions.get("screen");
const { width } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#38b6ff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    logo: {
        width: 20,
        height: 20,
    },
    title: {
        color: '#38b6ff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    button: {
        alignItems: 'flex-end',
        marginTop: 30,
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row',
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
});