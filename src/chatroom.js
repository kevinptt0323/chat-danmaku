import { Observable } from 'rxjs/Observable';

const CLASS_PREFIX = 'chat-danmaku';

class Chatroom {
  constructor() {
    this.msgObservable = Observable.create((observer) => {
      this.msgObserver = observer;
    });

    chrome.storage.sync.get({
      messageColor: this.messageColor,
      messageLineNumber: this.messageLineNumber,
    }, items => this.loadStorage(items, 'sync'));
    chrome.storage.onChanged.addListener(this.onStorageChanged.bind(this));
  }

  messageLineNumber = 10;
  messageColor = true;

  subscribe(...args) {
    this.msgObservable.subscribe(...args);
  }

  initDomObserver(chatroomEl) {
    const observerOptions = {
      childList: true,
    };

    this.domObservable = new MutationObserver(mutations => this.onUpdate(mutations));
    this.domObservable.observe(chatroomEl, observerOptions);
  }

  loadStorage(items, namespace) {
    const changed = {};
    Object.keys(items).forEach((key) => {
      changed[key] = {
        newValue: items[key],
        oldValue: null,
      };
    });
    this.onStorageChanged(changed, namespace);
  }

  onStorageChanged(changed) {
    if ('messageColor' in changed) {
      this.messageColor = changed.messageColor.newValue;
    }
    if ('messageLineNumber' in changed) {
      this.messageLineNumber = changed.messageLineNumber.newValue;
    }
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
    msgEl.classList.add(`${CLASS_PREFIX}_message`);
    if (this.messageColor) {
      msgEl.style.setProperty('--color', msg.color);
    }
    msgEl.style.setProperty('--line-num', ~~(Math.random() * this.messageLineNumber));
    msgEl.innerHTML = msg.content;

    this.canvasEl.appendChild(msgEl);
  }
}

export default Chatroom;
