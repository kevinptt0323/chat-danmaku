import camelCase from 'camelcase';
import { getChromeOptions, querySelector as $ } from '../utils';

function bindBooleanOption(key) {
  const camelCaseKey = camelCase(key);
  const dom = $(`#${key}`);

  document.addEventListener('DOMContentLoaded', async () => {
    const options = await getChromeOptions();
    if (options[camelCaseKey]) {
      dom.MaterialSwitch.on();
    } else {
      dom.MaterialSwitch.off();
    }
  });

  dom.addEventListener('change', (e) => {
    chrome.storage.sync.set({
      [camelCaseKey]: e.target.checked,
    });
  });
}

function bindNumberOption(key) {
  const camelCaseKey = camelCase(key);
  const dom = $(`#${key}`);

  document.addEventListener('DOMContentLoaded', async () => {
    const options = await getChromeOptions();
    $(`#${key}__input`).value = options[camelCaseKey];
  });

  dom.addEventListener('change', function onMessageLineNumberChange(e) {
    const { target } = e;
    let value = target.value | 0;
    if (value < target.min || value > target.max) {
      value = Math.max(target.min, value);
      value = Math.min(target.max, value);
      target.value = value;
      this.MaterialTextfield.checkValidity();
    }
    chrome.storage.sync.set({
      [camelCaseKey]: value,
    });
  });
}

bindBooleanOption('message-color');
bindBooleanOption('message-border');
bindBooleanOption('message-shadow');
bindNumberOption('message-line-number');

