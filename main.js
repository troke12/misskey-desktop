const { app, BrowserWindow, nativeImage, shell } = require('electron');
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

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    event.preventDefault(); // Prevent opening the link in a new window

    // Check if the clicked link has a class ending with "_link"
    const regex = /(\S+_link)$/i;
    const className = frameName.match(regex)?.[0];
    
    if (className) {
      // Open links with the specified class in the default browser
      shell.openExternal(url);
    } else {
      // Handle other types of links within the Electron app
      mainWindow.loadURL(url);
    }
  });

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
