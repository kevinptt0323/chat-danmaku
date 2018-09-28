import defaultOptions from '../options/defaultOptions';

const querySelector = document.querySelector.bind(document);
const querySelectorAll = document.querySelectorAll.bind(document);

function getChromeOptions(keys = defaultOptions) {
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, items => resolve(items));
  });
}

export {
  getChromeOptions,
  querySelector,
  querySelectorAll,
};
