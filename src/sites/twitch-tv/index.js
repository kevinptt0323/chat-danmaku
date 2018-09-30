import Chatroom from '../../chatroom';
import { querySelector as $ } from '../../utils';

const CLASS_PREFIX = 'chat-danmaku';

class Twitch extends Chatroom {
  requireSelector = ['.chat-list__lines div[role="log"]', '.player-video'];
  requireSelectorCache = [];

  onReady() {
    super.onReady();
    const chatroomEl = $('.chat-list__lines div[role="log"]');
    this.observe(chatroomEl);
    const playerEl = $('.player-video');
    this.canvasEl = Chatroom.createCanvas(playerEl);

    const oldToggleChatroomBtn = $('button.right-column__toggle-visibility');
    this.newToggleChatroomBtn = oldToggleChatroomBtn.cloneNode(true);
    this.newToggleChatroomBtn.classList.add(`${CLASS_PREFIX}__fake-toggle-collapse-btn`);
    this.newToggleChatroomBtn.addEventListener('click', Twitch.toggleChatroom);
    oldToggleChatroomBtn.parentNode.appendChild(this.newToggleChatroomBtn);
  }

  onChange() {
    super.onChange();
    this.disconnect();
    if (this.canvasEl) {
      this.canvasEl.remove();
      this.canvasEl = null;
    }
    if (this.newToggleChatroomBtn) {
      this.newToggleChatroomBtn.removeEventListener('click', Twitch.toggleChatroom);
      this.newToggleChatroomBtn.remove();
      this.newToggleChatroomBtn = null;
    }
  }

  static toggleChatroom() {
    const chatroomRootEl = $('.right-column > div:first-child');
    const whispersEl = $('.whispers');
    const playerRootEl = $('.persistent-player');
    const oldExpanded = chatroomRootEl.classList.contains('tw-block');
    const isTheatre = playerRootEl.classList.contains('persistent-player--theatre');
    if (oldExpanded) {
      chatroomRootEl.classList.remove('tw-block');
      chatroomRootEl.classList.add('tw-hide');
      whispersEl.classList.remove('whispers--right-column-expanded');
      if (isTheatre) {
        playerRootEl.style.width = '100%';
      }
    } else {
      chatroomRootEl.classList.add('tw-block');
      chatroomRootEl.classList.remove('tw-hide');
      whispersEl.classList.add('whispers--right-column-expanded');
      if (isTheatre) {
        playerRootEl.style.width = 'calc(100% - 34rem)';
      }
    }
  }

  onUpdate(mutations) {
    super.onUpdate();
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
