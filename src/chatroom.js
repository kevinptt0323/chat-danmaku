import { Observable } from 'rxjs/Observable';
import { getChromeOptions, querySelector as $ } from './utils';
import { keys as optionKeys } from './options/defaultOptions';

const CLASS_PREFIX = 'chat-danmaku';

class Chatroom {
  options = {};
  requireSelector = [];
  requireSelectorCache = [];
  lineNumberRecord = [];
  static collisionLineNumber = 3;

  constructor() {
    this.msgObservable = Observable.create((observer) => {
      this.msgObserver = observer;
    });
    this.chatroomObservable = new MutationObserver(mutations => this.onUpdate(mutations));
    getChromeOptions().then(items => this.loadStorage(items, 'sync'));
    chrome.storage.onChanged.addListener(this.onStorageChanged.bind(this));
    this.onChange();
  }

  checkReady() {
    return new Promise((resolve) => {
      const handler = setInterval(() => {
        if (this.requireSelector.every(sel => $(sel) !== null)) {
          clearInterval(handler);
          resolve();
        }
      }, 1000);
    });
  }

  checkChange() {
    return new Promise((resolve) => {
      const handler = setInterval(() => {
        if (this.requireSelector.some((sel, idx) => $(sel) !== this.requireSelectorCache[idx])) {
          clearInterval(handler);
          resolve();
        }
      }, 1000);
    });
  }

  onReady() {
    this.requireSelectorCache = this.requireSelector.map(sel => $(sel));
    this.lineNumberRecord = [];
    this.checkChange().then(this.onChange.bind(this));
  }

  onChange() {
    this.requireSelectorCache = this.requireSelector.map(sel => $(sel));
    this.checkReady().then(this.onReady.bind(this));
  }

  /* eslint-disable class-methods-use-this */
  onUpdate() {
  }
  /* eslint-enable class-methods-use-this */

  subscribe(...args) {
    this.msgObservable.subscribe(...args);
  }

  observe(chatroomEl) {
    this.chatroomObservable.observe(chatroomEl, { childList: true });
  }

  disconnect() {
    this.chatroomObservable.disconnect();
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
    optionKeys
      .filter(key => key in changed)
      .forEach((key) => {
        this.options[key] = changed[key].newValue;
      });
  }

  static createCanvas(parentEl) {
    if (parentEl === null) {
      return null;
    }
    const canvasEl = document.createElement('div');
    canvasEl.classList.add(`${CLASS_PREFIX}-messages`);
    parentEl.appendChild(canvasEl);
    canvasEl.addEventListener('animationend', e => e.target.remove());
    return canvasEl;
  }

  randomNextLineNumber() {
    return ~~(Math.random() * this.options.messageLineNumber);
  }

  getNextLineNumber() {
    let nextLineNumber = this.randomNextLineNumber();
    while (this.lineNumberRecord.indexOf(nextLineNumber) !== -1) {
      nextLineNumber = this.randomNextLineNumber();
    }
    if (this.lineNumberRecord.length === Chatroom.collisionLineNumber) {
      this.lineNumberRecord = this.lineNumberRecord.slice(1);
    }
    this.lineNumberRecord.push(nextLineNumber);
    return nextLineNumber;
  }

  render(msg) {
    const msgEl = document.createElement('div');
    msgEl.classList.add(`${CLASS_PREFIX}-message`);
    if (this.options.messageColor) {
      msgEl.style.setProperty('--color', msg.color);
    }
    if (this.options.messageBorder) {
      msgEl.classList.add('border');
    }
    if (this.options.messageShadow) {
      msgEl.classList.add('shadow');
    }
    msgEl.style.setProperty('--opacity', this.options.messageOpacity / 100);
    msgEl.style.setProperty('--line-num', this.getNextLineNumber());
    if (this.options.showAuthor) {
      msgEl.innerHTML = `${msg.author}: ${msg.content}`;
    } else {
      msgEl.innerHTML = msg.content;
    }

    this.canvasEl.appendChild(msgEl);
  }
}

export default Chatroom;
