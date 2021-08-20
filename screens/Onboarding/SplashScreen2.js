import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as Animatable from 'react-native-animatable'

const SplashScreen2 = ({navigation}) => {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
            <Animatable.Image
                animation="bounceIn"
                duraton="1500"
            source={require('../../assets/Splash2-3.jpg')}
            resizeMode="stretch"
        />
        </View>
        <Animatable.View 
            style={styles.footer}
            animation="fadeInUpBig"
        >
            <Text style={styles.title}>Contamos con todas las especialidades</Text>
            <Text style={styles.text}>Aquí podrás encontrar todas las especialidades médicas que necesites. </Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={() => navigation.navigate('SplashScreen3')}>
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

export default SplashScreen2;

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fbfbfb'
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
    },
    text: {
        color: 'white',
    }
});