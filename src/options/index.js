import camelCase from 'camelcase';
import { getChromeOptions, querySelector as $ } from '../utils';
import defaultOptions from './defaultOptions';

function renderBooleanOption(dom, value) {
  if (value) {
    dom.MaterialSwitch.on();
  } else {
    dom.MaterialSwitch.off();
  }
}

function bindBooleanOption(key) {
  const camelCaseKey = camelCase(key);
  const dom = $(`#${key}`);

  document.addEventListener('DOMContentLoaded', async () => {
    const options = await getChromeOptions();
    renderBooleanOption(dom, options[camelCaseKey]);
  });

  dom.addEventListener('change', (e) => {
    chrome.storage.sync.set({
      [camelCaseKey]: e.target.checked,
    });
  });

  $('#reset').addEventListener('click', () => {
    renderBooleanOption(dom, defaultOptions[camelCaseKey]);
  });
}

function renderNumberOption(dom, value, placeholder) {
  const inputDom = dom.querySelector('.mdl-textfield__input');
  inputDom.value = value;
  if (typeof placeholder !== 'undefined') {
    inputDom.placeholder = placeholder;
  }
  dom.MaterialTextfield.checkValidity();
}

function bindNumberOption(key) {
  const camelCaseKey = camelCase(key);
  const dom = $(`#${key}`);

  document.addEventListener('DOMContentLoaded', async () => {
    const options = await getChromeOptions();
    renderNumberOption(dom, options[camelCaseKey], defaultOptions[camelCaseKey]);
  });

  dom.addEventListener('change', function onMessageLineNumberChange(e) {
    const { target } = e;
    let value = target.value | 0;
    if (value < target.min || value > target.max) {
      value = Math.max(target.min, value);
      value = Math.min(target.max, value);
      renderNumberOption(this, value);
    }
    chrome.storage.sync.set({
      [camelCaseKey]: value,
    });
  });

  $('#reset').addEventListener('click', () => {
    renderNumberOption(dom, defaultOptions[camelCaseKey], defaultOptions[camelCaseKey]);
  });
}

bindBooleanOption('message-color');
bindBooleanOption('message-border');
bindBooleanOption('message-shadow');
bindNumberOption('message-opacity');
bindNumberOption('message-line-number');

$('#reset').addEventListener('click', () => {
  chrome.storage.sync.set(defaultOptions);
});

