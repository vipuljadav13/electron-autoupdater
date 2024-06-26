const { app, BrowserWindow } = require("electron");
const MainScreen = require("./screens/main/mainScreen");
const { autoUpdater } = require("electron-updater");
const log = require("electron-log");
const path = require("path");

log.transports.file.resolvePathFn = () => path.join("E:/wamp/www/laravel/electron-autoupdater-main/electron-autoupdater-main/app/dist", 'logs/main.log');

let curWindow;

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;
// Auto update feature
// autoUpdater.requestHeaders = {"PRIVATE-TOKEN": "glpat-ifyYWy3tWUycq2zxXVEG"};

function createWindow() {
  curWindow = new MainScreen();
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
  log.info(info);
});




//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
  log.info('---------');
  log.info(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();
});