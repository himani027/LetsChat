import ChatKitty from 'chatkitty';

export const kitty = ChatKitty.getInstance('---API-Key---');

export function getChannelDisplayName(channel) {
	if (channel.type === 'DIRECT') {
		return channel.members.map((member) => member.displayName).join(', ');
	}
	else {
		return channel.name;
	}
}
