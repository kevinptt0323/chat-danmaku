import Chatroom from '../../chatroom';

class Twitch extends Chatroom {
  constructor() {
    super();
    setTimeout(() => {
      const chatroomEl =
        document.querySelector('.chat-list__lines div[role="log"]');
      this.initDomObserver(chatroomEl);
      const parentEl = document.querySelector('.player-video');
      this.canvasEl = Chatroom.createCanvas(parentEl);
    }, 2000);
  }

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
