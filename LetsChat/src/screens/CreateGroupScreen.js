import React, { useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { IconButton, Title } from 'react-native-paper';
import { kitty } from '../chat';
import FormButton from '../components/FormButton';
import FormInput from '../components/FormInput';
import Color from '../utils/colors';

const { width, height } = Dimensions.get('screen');

export default function CreateGroupScreen({ navigation }) {
  const [groupName, setGroupName] = useState('');

  function handleButtonPress() {
    if (groupName.length > 0) {
      kitty
        .createChannel({
          type: 'PUBLIC',
          name: groupName,
        })
        .then(() => navigation.navigate("Let's Chat"));
    }
  }

  return (
    <View style={styles.rootContainer}>
      <View style={styles.closeButtonContainer}>
        <IconButton
          icon="close-circle"
          size={36}
          color={Color.primary}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.innerContainer}>
        <Title style={styles.title}>Create a new Group</Title>
        <FormInput
          placeholder="Enter Group Name"
          placeholderTextColor={Color.darkgrey}
          value={groupName}
          autoCapitalize="none"
          style={styles.input}
          onChangeText={(text) => setGroupName(text)}
          clearButtonMode="while-editing"
        />
        <FormButton
          title="Create"
          modeValue="contained"
          onPress={() => handleButtonPress()}
          disabled={groupName.length === 0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
  },
  closeButtonContainer: {
    position: 'absolute',
    top: 30,
    right: 0,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    color: Color.primary,
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
