import React from 'react';
import Color from '../utils/colors';
import { Dimensions, Image, StyleSheet, SafeAreaView, View, Text, TouchableOpacity, } from 'react-native';

const { width, height } = Dimensions.get('screen');

export default function WelcomeScreen({ navigation }) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/logo.png')}
                    style={styles.logo}
                />
                <Text style={styles.appName}>Let's Chat</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.btn}>
                <Text style={styles.btnText}>Get Started</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.primary,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },

    logo: {
        width: 180,
        height: 180,
    },

    appName: {
        color: Color.white,
        fontWeight: 'bold',
        fontSize: 42,
        textAlign: 'center',
    },

    logoContainer: {
        position: 'absolute',
        top: 100,
        alignItems: 'center',
    },

    btn: {
        marginBottom: '15%',
        backgroundColor: Color.white,
        width: width / 1.5,
        height: height / 13,
        borderRadius: 80,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
    },

    btnText: {
        color: Color.primary,
        fontSize: 20,
        fontWeight: 'bold',
    },

})

