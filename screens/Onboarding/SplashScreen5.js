import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'

const SplashScreen5 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image
                animation="bounceIn"
                duraton="1500"
                source={require('../../assets/Splash5-5-2.jpg')}
            resizeMode="stretch"
        />
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.title}>Consultas por videollamada, presencial o a domicilio</Text>
            <Text style={styles.text}>Tu escoges la forma en la que quieres recibir tu consulta. Ya sea de forma virtual o presencial.</Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('SplashScreen7')}>
                <LinearGradient
                    colors={['#fff', '#fff']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Continuar</Text>
                    <MaterialIcons
                        name="navigate-next"
                        color="#38b6ff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
        </View>
    );
  };

export default SplashScreen5;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footer: {
        flex: 1,
        backgroundColor: '#38b6ff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30,
    },
    text: {
        color: '#fff',
    },

    logo: {
        width: height_logo,
        height: height_logo,
    },
    title: {
        color: '#fff',
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
        tintColor: '#38b6ff',
    },
    textSign: {
        color: '#38b6ff',
        fontWeight: 'bold'
    }
});