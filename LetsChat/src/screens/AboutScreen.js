import React, { useContext, } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, Linking } from 'react-native'
import Color from '../utils/colors';
import FormButton from '../components/FormButton';
import { AuthContext } from '../navigation/AuthProvider';
import Loading from '../components/Loading';

export default function AboutScreen() {

    const { logout, loading } = useContext(AuthContext);

    if (loading) {
        return <Loading />;
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.main}>
                <Image
                    source={require('../../assets/logo12.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Let's Chat</Text>
            </View>

            <View style={styles.subcontainer}>
                <Text style={styles.content}>
                    Let's Chat is Simple chat application built with
                    React Native & Expo.
                    {'\n'}
                    With features of direct and group chat.
                    You can create your own public group and join other groups.
                    {'\n'}{'\n'}
                    For any query, improvement ideas contact at {'\t'}
                    <Text style={[styles.content, { color: Color.primary }]}
                        onPress={() => {
                            Linking.openURL('mailto: dev.letschat@gmail.com')
                        }}>
                        dev.letschat@gmail.com
                            {'\n'}{'\n'}
                    </Text>
                        Thank you using our App.
                        {'\n'}
                        Developers - Himani Dalal &  Mira Gupta.
                        {'\n'}

                </Text>
                <View style={{ alignItems: 'center' }}>
                    <FormButton
                        title="Logout"
                        modeValue="contained"
                        uppercase={false}
                        onPress={() => logout()}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.white,
    },
    main: {
        margin: 12,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 28,
        color: Color.primary,
        fontWeight: 'bold',
    },
    logo: {
        width: 80,
        height: 80,
    },
    subcontainer: {
        marginVertical: 12,
        marginHorizontal: 20,

    },
    content: {
        fontSize: 18,
    }

})
