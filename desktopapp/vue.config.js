

const ICONS_DIR = "build/icons";
const app_version = "0.1-alpha";
module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: [
        "fabric-protos",
        "fabric-network",
        "fabric-common",
        "fabric-ca-client",
      ],
      builderOptions: {
        //asar: false,
        appId: "com.electron.Fabric-Manager",
        productName: "Fabric-Manager",
        buildVersion:app_version,
        win: { icon: ICONS_DIR ,target:["nsis"]},
        // msi:{
        //   allowElevation: false,
        //   allowToChangeInstallationDirectory: true,
        //   oneClick: false,
        //   perMachine: true,
         
        // },
        nsis: {
          allowElevation: false,
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          perMachine: true,
          //include:"build/installer.nsh",
          uninstallDisplayName:"unins000"
          //createDesktopShortcut : false,
          //createStartMenuShortcut : false,
          //menuCategory :true
        },
        extraResources: [
          { from: "extraResources/example_code", to: "example_code" },
          { from: "extraResources/log", to: "extraResources/log" },
          { from: "extraResources/bin", to: "extraResources/bin" },
          { from: "extraResources/config", to: "extraResources/config" },
        ],
      },
    },
  },
};
