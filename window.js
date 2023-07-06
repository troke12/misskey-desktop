const { BrowserWindow, nativeImage } = require('electron');
const path = require('path');

let mainWindow; // Change to a regular variable instead of a constant

function createWindow() {
  const iconPath = path.join(__dirname, 'assets/icon.png');

  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true, // Hide the default menu bar
    icon: nativeImage.createFromPath(iconPath),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Load the preload script
    },
  });

  mainWindow.loadURL('https://misskey.id');

  mainWindow.webContents.on('new-window', (event, url, frameName, disposition, options) => {
    event.preventDefault(); // Prevent opening the link in a new window

    const isExternalLink = !url.startsWith('file://') && !url.startsWith('http://') && !url.startsWith('https://');

    if (isExternalLink) {
      // Send a message to the renderer process indicating an external link is clicked
      mainWindow.webContents.send('external-link-clicked', url);
    } else {
      //console.log('Navigating to internal link:', url);
      mainWindow.loadURL(url); // Handle other types of links within the Electron app
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
}

module.exports = createWindow;
