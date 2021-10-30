module.exports = {
  packagerConfig: {
    icon: "./src/assets/icons/icon.ico",
  },
  makers: [
    // {
    //     "name": "@electron-forge/maker-squirrel",
    //     "config": {
    //         "name": "my_new_app"
    //     }
    // },
    // {
    //     "name": "@electron-forge/maker-zip",
    //     "platforms": [
    //         "darwin"
    //     ]
    // },
    // {
    //     "name": "@electron-forge/maker-deb",
    //     "config": {}
    // },
    // {
    //     "name": "@electron-forge/maker-rpm",
    //     "config": {}
    // }
  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        owner: "Mais Hatem",
        name: "time-it-app",
      },
      draft: true,
    },
  ],
  plugins: [
    [
      "@electron-forge/plugin-webpack",
      {
        mainConfig: "./webpack.main.config.js",
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com`,
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/index.html",
              js: "./src/renderer.js",
              name: "main_window",
              preload: {
                js: "./src/preload.js",
              },
            },
          ],
        },
      },
    ],
  ],
};
