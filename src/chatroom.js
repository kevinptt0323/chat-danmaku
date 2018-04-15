import { Observable } from 'rxjs/Observable';

const CLASS_PREFIX = 'chatroom-danmaku';

class Chatroom {
    constructor() {
        this.msgObservable = Observable.create((observer) => {
            this.msgObserver = observer;
        });
    }

    subscribe(...args) {
        this.msgObservable.subscribe(...args);
    }

    initDomObserver(chatroomEl) {
        const observerOptions = {
            childList: true,
        };

        this.domObservable = new MutationObserver(mutations =>
            this.onUpdate(mutations));
        this.domObservable.observe(chatroomEl, observerOptions);
    }

    static createCanvas(parentEl) {
        const canvasEl = document.createElement('div');
        canvasEl.classList.add(`${CLASS_PREFIX}_messages`);
        parentEl.appendChild(canvasEl);
        return canvasEl;
    }

    render(msg) {
        const msgEl = document.createElement('div');
        msgEl.classList.add(`${CLASS_PREFIX}_message`);
        msgEl.style.color = msg.color;
        msgEl.style.top = `${(((Math.random() * 10) | 0) * 32 + 4)}px`;
        msgEl.innerHTML = msg.content;

        this.canvasEl.appendChild(msgEl);
        setTimeout(() => msgEl.remove(), 10000);
    }
}

export default Chatroom;
