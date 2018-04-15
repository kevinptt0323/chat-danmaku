import Chatroom from '../../chatroom';

class GarenaLive extends Chatroom {
    constructor() {
        super();
        setTimeout(() => {
            const chatroomEl =
                document.querySelector('.livestream__chat-messages');
            this.initDomObserver(chatroomEl);
            const parentEl = document.querySelector('.livestream__overlay');
            this.canvasEl = Chatroom.createCanvas(parentEl);
        }, 2000);
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
