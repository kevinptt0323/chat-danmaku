import { querySelector as $ } from '../utils';
import Chatroom from '../chatroom';

/*
 * Restores state using the preferences stored in chrome.storage.
 */
function restoreOptions() {
  chrome.storage.sync.get(Chatroom.defaultOptions, ({
    messageColor,
    messageBorder,
    messageShadow,
    messageLineNumber,
  }) => {
    if (messageColor) {
      $('#message-color').MaterialSwitch.on();
    } else {
      $('#message-color').MaterialSwitch.off();
    }
    if (messageBorder) {
      $('#message-border').MaterialSwitch.on();
    } else {
      $('#message-border').MaterialSwitch.off();
    }
    if (messageShadow) {
      $('#message-shadow').MaterialSwitch.on();
    } else {
      $('#message-shadow').MaterialSwitch.off();
    }
    $('#message-line-number__input').value = messageLineNumber;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

$('#message-color').addEventListener('change', (e) => {
  chrome.storage.sync.set({
    messageColor: e.target.checked,
  });
});

$('#message-border').addEventListener('change', (e) => {
  chrome.storage.sync.set({
    messageBorder: e.target.checked,
  });
});

$('#message-shadow').addEventListener('change', (e) => {
  chrome.storage.sync.set({
    messageShadow: e.target.checked,
  });
});

$('#message-line-number').addEventListener('change', function onMessageLineNumberChange(e) {
  const { target } = e;
  let value = target.value | 0;
  if (value < target.min || value > target.max) {
    value = Math.max(target.min, value);
    value = Math.min(target.max, value);
    target.value = value;
    this.MaterialTextfield.checkValidity();
  }
  chrome.storage.sync.set({
    messageLineNumber: value,
  });
});
