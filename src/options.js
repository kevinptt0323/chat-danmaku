import { querySelector as $ } from './utils';

// Restores state using the preferences stored in chrome.storage.
function restoreOptions() {
  chrome.storage.sync.get({
    messageColor: true,
  }, (items) => {
    if (items.messageColor) {
      $('#message-color').parentNode.MaterialSwitch.on();
    } else {
      $('#message-color').parentNode.MaterialSwitch.off();
    }
  });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
// $('#save').addEventListener('click', saveOptions);
$('#message-color').addEventListener('change', (e) => {
  chrome.storage.sync.set({
    messageColor: e.target.checked,
  });
});
