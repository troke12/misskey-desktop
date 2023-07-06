const { app, ipcMain, shell } = require('electron');
const createMenu = require('./menu');
const createWindow = require('./window');

app.on('ready', () => {
  const mainWindow = createWindow();
  createMenu(mainWindow);

  // Register an IPC listener to receive messages from the renderer process
  ipcMain.on('open-external-link', (event, url) => {
    shell.openExternal(url); // Open external links in the default browser
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    const mainWindow = createWindow();
    createMenu(mainWindow);
  }
});
