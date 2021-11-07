import { withInAppNotification } from '@chatkitty/react-native-in-app-notification';
import { createStackNavigator } from '@react-navigation/stack';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import React, { useEffect } from 'react';
import { Platform, } from 'react-native';
import { IconButton } from 'react-native-paper';
import { getChannelDisplayName, kitty } from '../chat';
import JoinGroupsScreen from '../screens/JoinGroupsScreen';
import ChatScreen from '../screens/ChatScreen';
import CreateGroupScreen from '../screens/CreateGroupScreen';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import Color from '../utils/colors';


const ChatStack = createStackNavigator();
const ModalStack = createStackNavigator();

export default function HomeStack() {

	useEffect(() => {
		registerForPushNotificationsAsync().then((token) => {
			kitty.updateCurrentUser((user) => {
				user.properties = {
					...user.properties,
					'expo-push-token': token,
				};
				return user;
			});
		});
	}, []);

	return (
		<ModalStack.Navigator mode="modal" headerMode="none">
			<ModalStack.Screen
				name="Lets Chat"
				component={withInAppNotification(ChatComponent)}
			/>
			<ModalStack.Screen name="Create Group" component={CreateGroupScreen} />
		</ModalStack.Navigator>
	);
}

function ChatComponent({ navigation, showNotification }) {

	useEffect(() => {
		return kitty.onNotificationReceived((notification) => {
			showNotification({
				title: notification.title,
				message: notification.body,
				onPress: () => {
					switch (notification.data.type) {
						case 'USER:SENT:MESSAGE':
						case 'SYSTEM:SENT:MESSAGE':
							kitty.getChannel(notification.data.channelId).then((result) => {
								navigation.navigate('Chat', { channel: result.channel });
							});
							break;
					}
				},
			});
		});
	}, [navigation, showNotification]);

	return (

		<ChatStack.Navigator
			screenOptions={{
				headerStyle: {
					backgroundColor: Color.primary,
				},
				headerTintColor: '#ffffff',
				headerTitleStyle: {
					fontSize: 22,
				},
			}}
		>
			<ChatStack.Screen
				name="Let's Chat"
				component={HomeScreen}
				options={(options) => ({
					headerRight: () => (
						<IconButton
							icon="plus"
							size={28}
							color="#ffffff"
							onPress={() => options.navigation.navigate('Join Groups')}
						/>
					),
					headerLeft: () => (
						<IconButton
							icon="information-outline"
							size={28}
							color="#ffffff"
							onPress={() => options.navigation.navigate('About App')}
						/>
					),
				})}
			/>
			<ChatStack.Screen
				name="About App"
				component={AboutScreen}
			/>
			<ChatStack.Screen
				name="Join Groups"
				component={JoinGroupsScreen}
				options={(options) => ({
					headerRight: () => (
						<IconButton
							icon="plus"
							size={28}
							color="#ffffff"
							onPress={() => options.navigation.navigate('Create Group')}
						/>
					),
				})}
			/>
			<ChatStack.Screen
				name="Chat"
				component={withInAppNotification(ChatScreen)}
				options={({ route }) => ({
					title: getChannelDisplayName(route.params.channel),
				})}
			/>
		</ChatStack.Navigator>
	);
}

async function registerForPushNotificationsAsync() {
	let token;

	if (Constants.isDevice && Platform.OS !== 'web') {
		const {
			status: existingStatus,
		} = await Notifications.getPermissionsAsync();
		let finalStatus = existingStatus;
		if (existingStatus !== 'granted') {
			const { status } = await Notifications.requestPermissionsAsync();
			finalStatus = status;
		}
		if (finalStatus !== 'granted') {
			console.log('Failed to get push token for push notification!');
			return;
		}

		token = (await Notifications.getExpoPushTokenAsync()).data;
	} else {
		console.log('Must use physical device for Push Notifications');
	}

	if (Platform.OS === 'android') {
		await Notifications.setNotificationChannelAsync('default', {
			name: 'default',
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: '#FF231F7C',
		});
	}

	return token;
}
