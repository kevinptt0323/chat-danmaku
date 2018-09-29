import Chatroom from '../../chatroom';
import { querySelector as $ } from '../../utils';

class GarenaLive extends Chatroom {
  requireSelector = ['.livestream__chat-messages', '.livestream__overlay'];

  onReady() {
    const chatroomEl = $('.livestream__chat-messages');
    this.initDomObserver(chatroomEl);
    const parentEl = $('.livestream__overlay');
    this.canvasEl = Chatroom.createCanvas(parentEl);
  }

  onUpdate(mutations) {
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        const authorEl =
          node.querySelector('.livestream__chat-author');
        const contentEl =
          node.querySelector('.livestream__chat-message-content');
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

export default GarenaLive;
