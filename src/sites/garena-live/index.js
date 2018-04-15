import { Observable } from 'rxjs/Observable';

const CLASS_PREFIX = 'chatroom-danmaku';

class GarenaLive {
    constructor(msgObservable, el) {
        this.msgObservable = Observable.create(observer => {
            this.msgObserver = observer;
        });
        setTimeout(() => {
            this.initDomObserver(el);
            this.$$canvas = this.createCanvas();
        }, 2000);
    }

    subscribe(...args) {
        this.msgObservable.subscribe(...args);
    }

    initDomObserver(el) {
        const _el = el || document.querySelector('.livestream__chat-messages');
        const observerOptions = {
            childList: true
        };

        this.domObservable = new MutationObserver(
            mutations => this.onUpdate(mutations)
        );
        this.domObservable.observe(_el, observerOptions);
    }

    onUpdate(mutations) {
        const newMessages = [];
        mutations.forEach(({ addedNodes }) => {
            addedNodes.forEach(node => {
                const $$author =
                    node.querySelector('.livestream__chat-author');
                const $$content =
                    node.querySelector('.livestream__chat-message-content');
                if ($$author && $$content) {
                    this.msgObserver.next({
                        author: $$author.innerHTML,
                        color: $$author.style.color,
                        content: $$content.innerHTML,
                    });
                }
            });
        });
    }

    createCanvas() {
        const $$canvas = document.createElement('div');
        $$canvas.classList.add(`${CLASS_PREFIX}_messages`);
        const $$parent = document.querySelector('.livestream__overlay');
        $$parent.appendChild($$canvas);
        return $$canvas;
    }

    render(msg) {
        const $$msg = document.createElement('div');
        $$msg.classList.add(`${CLASS_PREFIX}_message`);
        $$msg.style.color = msg.color;
        $$msg.style.top = (((Math.random() * 10)|0) * 32 + 4) + 'px';
        $$msg.innerHTML = msg.content;
        this.$$canvas.appendChild($$msg);
        setTimeout(() => $$msg.remove(), 10000);
    }
};

export default GarenaLive;
