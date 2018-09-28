import { Observable } from 'rxjs/Observable';

const CLASS_PREFIX = 'chat-danmaku';

class Chatroom {
  constructor() {
    this.msgObservable = Observable.create((observer) => {
      this.msgObserver = observer;
    });

    chrome.storage.sync.get(Chatroom.defaultOptions, items => this.loadStorage(items, 'sync'));
    chrome.storage.onChanged.addListener(this.onStorageChanged.bind(this));
  }

  static defaultOptions = {
    messageColor: true,
    messageBorder: true,
    messageShadow: false,
    messageLineNumber: 10,
  }
  options = {}

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
      this.options.messageColor = changed.messageColor.newValue;
    }
    if ('messageBorder' in changed) {
      this.options.messageBorder = changed.messageBorder.newValue;
    }
    if ('messageShadow' in changed) {
      this.options.messageShadow = changed.messageShadow.newValue;
    }
    if ('messageLineNumber' in changed) {
      this.options.messageLineNumber = changed.messageLineNumber.newValue;
    }
  }

  static createCanvas(parentEl) {
    const canvasEl = document.createElement('div');
    canvasEl.classList.add(`${CLASS_PREFIX}-messages`);
    parentEl.appendChild(canvasEl);
    canvasEl.addEventListener('animationend', e => e.target.remove());
    return canvasEl;
  }

  render(msg) {
    const msgEl = document.createElement('div');
    msgEl.classList.add(`${CLASS_PREFIX}-message`);
    if (this.options.messageColor) {
      msgEl.style.setProperty('--color', msg.color);
    }
    if (this.options.messageBorder) {
      msgEl.classList.add(`border`);
    }
    if (this.options.messageShadow) {
      msgEl.classList.add(`shadow`);
    }
    msgEl.style.setProperty('--line-num', ~~(Math.random() * this.options.messageLineNumber));
    msgEl.innerHTML = msg.content;

    this.canvasEl.appendChild(msgEl);
  }
}

export default Chatroom;
