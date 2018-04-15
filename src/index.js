import componentHandler from 'componentHandler';
import GarenaLive from './sites/garena-live';
import Twitch from './sites/twitch-tv';

const { host } = document.location;
const hostMapping = [
    { validate: /^garena\.live$/, chatroom: GarenaLive },
    { validate: /^www\.twitch\.tv$/, chatroom: Twitch },
];

const Chatrooms = hostMapping
    .filter(m => m.validate.test(host))
    .map(m => m.chatroom);

if (Chatrooms.length >= 1) {
    const chatroom = new Chatrooms[0]();

    chatroom.subscribe((msg) => {
        chatroom.render(msg);
    });
}

componentHandler.upgradeAllRegistered();
