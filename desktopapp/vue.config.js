module.exports = {
  chainWebpack: (config) => {
    config.externals({ pkcs11js: 'require("pkcs11js")' });
  },
  // chainWebpack: config => {
  //   config.module       .rule('ts')
  //       .use('ts-loader')
  //       .loader('ts-loader')
  //       .end()
  //       .rule(/\.node$/)
  //       .use('node-loader')
  //       .loader('node-loader')
  //       .end()
  // },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      externals: ["fabric-network"],
      builderOptions: {
        asar: false,
        // Config this section for make built in dir for app (need to have some file in dir )
        // extraFiles: [{ from: "extraResources", to: "bin/" }],
        extraResources: [
          // { from: "extraResources/test", to: "extraResources/test" },
          { from: "extraResources/example_code", to: "example_code" },
          { from: "extraResources/bin", to: "extraResources/bin" },
          { from: "extraResources/config", to: "extraResources/config" },
        ],
      },
    },
  },
};
