// const CopyPlugin = require("copy-webpack-plugin");
// const path = require("path");
// console.log(__dirname)
module.exports = {
  // plugins: [
  //   new CopyPlugin({
  //     patterns: [
  //       { from: "source", to: "dest" },
  //       { from: "other", to: "public" },
  //     ],
  //     options: {
  
  //     },
  //       // { from: "source", to: "dest" },
  //   }),
  // ],
  // chainWebpack: (config) => {
  //   config.externals({ pkcs11js: 'require("pkcs11js")' });
  // },
  // chainWebpack: config => {
  //   config.module      .rule('ts')
  //       .use('ts-loader')
  //       .loader('ts-loader')
  //       .end()
  //       .rule(/.node$/)
  //       .use('node-loader')
  //       .loader('node-loader')
  //       .end()
  // },
  // chainWebpack: config => {
  //   config.module 
  //       .rule(/.node$/)
  //       .use('node-loader')
  //       .loader('node-loader')
  //       .end()
  // },
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      // chainWebpack: config => {
      //   config.plugin('copy').use(CopyPlugin, [
      //     [
      //       {
      //         from: path.join("D:/hyperledger_project/devlop/desktopapp/node_modules/fabric-protos/protos/fabric.proto"),
      //         to: 'D:/hyperledger_project/devlop/desktopapp/node_modules/electron/dist/resources/electron.asar/renderer/protos/fabric.proto'
      //       }
      //     ]
      //   ])
      // },
      externals: ["fabric-protos","fabric-network","fabric-common","fabric-ca-client"],
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
