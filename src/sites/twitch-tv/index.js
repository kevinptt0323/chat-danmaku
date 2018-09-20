import Chatroom from '../../chatroom';
import { querySelector as $ } from '../../utils';

class Twitch extends Chatroom {
  constructor() {
    super();
    setTimeout(this.initialize, 2000);
  }

  initialize = () => {
    const chatroomEl = $('.chat-list__lines div[role="log"]');
    this.initDomObserver(chatroomEl);
    const parentEl = $('.player-video');
    this.canvasEl = Chatroom.createCanvas(parentEl);
  };

  onUpdate(mutations) {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        const authorEl =
          node.querySelector('.chat-author__display-name');
        const contentEl =
          node.querySelector('span[data-a-target="chat-message-text"]');
        if (authorEl && contentEl) {
          this.msgObserver.next({
            author: authorEl.innerHTML,
            color: authorEl.style.color,
            content: contentEl.innerHTML,
          });
        }
      });
    });
  }
}

export default Twitch;
