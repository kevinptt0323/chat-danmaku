import { Observable } from 'rxjs/Observable';

class GarenaLive {
    constructor(msgObservable, el) {
        this.msgObservable = Observable.create(observer => {
            this.msgObserver = observer;
        });
        this.initDomObserver(el);
    }

    subscribe(...args) {
        this.msgObservable.subscribe(...args);
    }

    initDomObserver(el) {
        const _el = el || document.querySelector('.livestream__chat-messages');
        if (!_el) {
            return false;
        }
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
};

export default GarenaLive;
