const { app, BrowserWindow, Menu } = require("electron");
const path = require("node:path");
// const ejse = require('ejs-electron')

// check if Mac
const isMac = process.platform === "darwin";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
    app.quit();
}

const createWindow = () => {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the login.html of the app.
    // mainWindow.loadFile(path.join(__dirname, "./views/login.html"));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
    mainWindow.loadURL("http://localhost:8000/login", {
        postData: [
            {
                type: "rawData",
                bytes: Buffer.from("electronToken=2d7b1a1f73088b0a36e759c689a7ca0b29af15bbae286b67cf1ab7f41d994e24d190e78ba9c8744845b6ae4ba12e9594f2155c610c527d24a3ab8d083ad2afbc" ),
            },
        ],
        extraHeaders: "Content-Type: application/x-www-form-urlencoded; charset=UTF-8",
    });
};

// About window
function createAboutWindow() {
    // Create the browser window.
    const aboutWindow = new BrowserWindow({
        width: 300,
        height: 300,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
        },
    });

    // and load the login.html of the app.
    aboutWindow.loadFile(path.join(__dirname, "./views/about.html"));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();

    const mainMenu = Menu.buildFromTemplate(menu);
    Menu.setApplicationMenu(mainMenu);
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

// Menu template
const menu = [
    ...(isMac
        ? [
              {
                  label: app.name,
                  submenu: [
                      {
                          label: "About",
                          click: createAboutWindow,
                      },
                  ],
              },
          ]
        : []),
    {
        role: "fileMenu",
    },
    ...(!isMac
        ? [
              {
                  label: "Help",
                  submenu: [
                      {
                          label: "About",
                          click: createAboutWindow,
                      },
                  ],
              },
          ]
        : []),
];

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
