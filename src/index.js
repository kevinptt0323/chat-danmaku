import componentHandler from 'componentHandler';
import GarenaLive from './sites/garena-live';

const chatroom = new GarenaLive();

chatroom.subscribe((msg) => {
    chatroom.render(msg);
});

componentHandler.upgradeAllRegistered();
