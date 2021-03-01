module.exports = {
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      //externals: ["better-sqlite3"],
      builderOptions: {
        // asar: false,
        // Config this section for make built in dir for app (need to have some file in dir )
        extraFiles: [{ from: "extraResources", to: "bin/" }],
        extraResources: [
          { from: "extraResources/test", to: "extraResources/test" },
          { from: "extraResources/bin", to: "bin" },
        ],
      },
    },
  },
};
