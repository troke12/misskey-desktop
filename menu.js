const { app, Menu, dialog } = require('electron');

function createMenu(mainWindow) {
  const isMac = process.platform === 'darwin';

  const template = [
    // File menu
    {
      label: 'File',
      submenu: [
        {
          label: 'Exit',
          accelerator: isMac ? 'CmdOrCtrl+Q' : 'Alt+F4',
          click() {
            app.quit();
          },
        },
      ],
    },
    // View menu
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forcereload' },
        { role: 'togglefullscreen' },
      ],
    },
    // Help menu
    {
      label: 'About',
      click() {
        dialog.showMessageBox(mainWindow, {
          title: 'About',
          message: 'Unofficial Desktop for Misskey.ID\n\nMade with love by https://github.com/troke12',
          buttons: ['OK'],
        });
      },
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

module.exports = createMenu;
