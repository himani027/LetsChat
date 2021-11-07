import React, { useContext, useState } from 'react';
import { StyleSheet, View, Text, Dimensions, Image } from 'react-native';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import { AuthContext } from '../navigation/AuthProvider';
import Color from '../utils/colors'

const { width, height } = Dimensions.get('screen');

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login, loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/logo12.png')}
        style={styles.logo}
      />
      <Text style={styles.titleText}>Welcome Back!</Text>
      <FormInput
        placeholder="Enter email"
        placeholderTextColor={Color.darkgrey}
        value={email}
        autoCapitalize="none"
        style={styles.input}
        onChangeText={(userEmail) => setEmail(userEmail)}
      />
      <FormInput
        placeholder="Enter password"
        placeholderTextColor={Color.darkgrey}
        value={password}
        autoCapitalize="none"
        secureTextEntry={true}
        style={styles.input}
        onChangeText={(userPassword) => setPassword(userPassword)}
      />
      <FormButton
        title="Login"
        modeValue="contained"
        uppercase={false}
        onPress={() => login(email, password)}
      />
      <Text style={[styles.registerTxt, { marginTop: '5%' }]} onPress={() => navigation.navigate('Signup')}> Don't have an account? Create one! </Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.white,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 1,
  },
  titleText: {
    fontSize: 32,
    marginBottom: 10,
    color: Color.primary,
    fontWeight: 'bold',
  },
  loginButtonLabel: {
    fontSize: 22,
  },
  navButtonText: {
    fontSize: 18,
  },
  registerTxt: {
    color: Color.primary,
    fontSize: 14,
  },
  input: {
    marginVertical: 10,
    width: width / 1.3,
    height: height / 16,
    color: Color.black,
    borderWidth: 0.5,
    borderRadius: 15,
    fontSize: 16,
    padding: 10,
  },
});
