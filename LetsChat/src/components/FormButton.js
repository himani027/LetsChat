import React from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Color from '../utils/colors'
const { width, height } = Dimensions.get('screen');

export default function FormButton({ title, modeValue, ...rest }) {
	return (
		<TouchableOpacity
			mode={modeValue}
			{...rest}
			style={styles.button}
		>
			<Text style={styles.buttonText}> {title} </Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		marginTop: 10,
		backgroundColor: Color.primary,
		width: width / 1.8,
		height: height / 15,
		borderRadius: 30,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15,
	},

	buttonText: {
		color: Color.white,
		fontSize: 18,
		fontWeight: 'bold',
	}
});
