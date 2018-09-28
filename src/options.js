import { querySelector as $ } from './utils';

/*
 * Restores state using the preferences stored in chrome.storage.
 */
function restoreOptions() {
  chrome.storage.sync.get({
    messageColor: true,
    messageLineNumber: 10,
  }, ({
    messageColor,
    messageLineNumber,
  }) => {
    if (messageColor) {
      $('#message-color').MaterialSwitch.on();
    } else {
      $('#message-color').MaterialSwitch.off();
    }
    $('#message-line-number__input').value = messageLineNumber;
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);

$('#message-color__input').addEventListener('change', (e) => {
  chrome.storage.sync.set({
    messageColor: e.target.checked,
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
