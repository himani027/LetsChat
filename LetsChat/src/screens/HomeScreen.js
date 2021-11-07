import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { Button, Dialog, Divider, List, Portal } from 'react-native-paper';
import Color from '../utils/colors';
import { getChannelDisplayName, kitty } from '../chat';
import Loading from '../components/Loading';

export default function HomeScreen({ navigation }) {
	const [channels, setChannels] = useState([]);
	const [loading, setLoading] = useState(true);
	const [leaveChannel, setLeaveChannel] = useState(null);

	function handleLeaveChannel() {
		kitty.leaveChannel({ channel: leaveChannel }).then(() => {
			setLeaveChannel(null);
			
			kitty.getChannels().then((result) => {
				setChannels(result.paginator.items);
			});
		});
	}

	function handleDismissLeaveChannel() {
		setLeaveChannel(null);
	}

	const isFocused = useIsFocused();

	useEffect(() => {
		let isCancelled = false;

		kitty.getChannels().then((result) => {
			if (!isCancelled) {
				setChannels(result.paginator.items);

				if (loading) {
					setLoading(false);
				}
			}
		});

		return () => {
			isCancelled = true;
		};
	}, [isFocused, loading]);

	if (loading) {
		return <Loading />;
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={channels}
				keyExtractor={(item) => item.id.toString()}
				ItemSeparatorComponent={() => <Divider />}
				renderItem={({ item }) => (
					<List.Item
						title={getChannelDisplayName(item)}
						description={item.type}
						titleNumberOfLines={1}
						titleStyle={styles.listTitle}
						descriptionStyle={styles.listDescription}
						descriptionNumberOfLines={1}
						onPress={() => navigation.navigate('Chat', { channel: item })}
						onLongPress={() => {
							setLeaveChannel(item);
						}}
					/>
				)}
			/>
			<Portal>
				<Dialog visible={leaveChannel} onDismiss={handleDismissLeaveChannel}>
					<Dialog.Title>Leave channel?</Dialog.Title>
					<Dialog.Actions>
						<Button onPress={handleDismissLeaveChannel}><Text style={{ color: Color.primary }}>Cancel</Text></Button>
						<Button onPress={handleLeaveChannel}><Text style={{ color: Color.primary }}>Confirm</Text></Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Color.white,
		flex: 1,
	},
	listTitle: {
		fontSize: 22,
	},
	listDescription: {
		fontSize: 14,
	},
});
