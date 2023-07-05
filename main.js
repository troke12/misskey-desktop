const { app, BrowserWindow, nativeImage } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    const iconPath = path.join(__dirname, 'assets/icon.png');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true, // Hide the toolbar
    icon: nativeImage.createFromPath(iconPath),
  });

  mainWindow.loadURL('https://misskey.id');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
