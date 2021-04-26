const ICONS_DIR = 'build/icons'
module.exports = {

  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["fabric-protos","fabric-network","fabric-common","fabric-ca-client"],
      builderOptions: {
        asar: false,
        appId: "com.electron.Fabric-Manager",
        productName :"Fabric-Manager",
        win:{icon:ICONS_DIR},
        extraResources: [
          { from: "extraResources/example_code", to: "example_code" },
          { from: "extraResources/example_code", to: "example_code" },
          { from: "extraResources/bin", to: "extraResources/bin" },
          { from: "extraResources/config", to: "extraResources/config" },
        ],
      },
    },
  },
};
