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
    const playerEl = $('.player-video');
    this.canvasEl = Chatroom.createCanvas(playerEl);

    const oldToggleChatroomBtn = $('button[data-a-target="right-column__toggle-collapse-btn"]');
    const newToggleChatroomBtn = oldToggleChatroomBtn.cloneNode(true);
    newToggleChatroomBtn.addEventListener('click', this.toggleChatroom);
    oldToggleChatroomBtn.parentNode.appendChild(newToggleChatroomBtn);
    oldToggleChatroomBtn.remove();
  };

  toggleChatroom() {
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
        playerRootEl.style['width'] = '100%';
      }
    } else {
      chatroomRootEl.classList.add('tw-block');
      chatroomRootEl.classList.remove('tw-hide');
      whispersEl.classList.add('whispers--right-column-expanded');
      if (isTheatre) {
        playerRootEl.style['width'] = 'calc(100% - 34rem)';
      }
    }
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
