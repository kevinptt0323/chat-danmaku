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
        canvasEl.addEventListener('animationend', e => e.target.remove());
        return canvasEl;
    }

    render(msg) {
        const msgEl = document.createElement('div');
        const lineNumber = 10;
        msgEl.classList.add(`${CLASS_PREFIX}_message`);
        msgEl.style.setProperty('--color', msg.color);
        msgEl.style.setProperty('--line-num', (Math.random() * lineNumber) | 0);
        msgEl.innerHTML = msg.content;

        this.canvasEl.appendChild(msgEl);
    }
}

export default Chatroom;
