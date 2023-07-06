const { ipcRenderer } = require('electron');

document.addEventListener('click', (event) => {
  let target = event.target;

  while (target && target.tagName !== 'A') {
    target = target.parentNode;
  }

  if (target && target.getAttribute('target') === '_blank') {
    event.preventDefault();
    const url = target.href;
    ipcRenderer.send('open-external-link', url);
  }
});
