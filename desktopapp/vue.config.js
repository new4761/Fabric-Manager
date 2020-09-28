module.exports = {
  pluginOptions: {
    electronBuilder: {
      asar:false,
      nodeIntegration: true,
      externals: ['better-sqlite3'],
      extraFiles: {
        from: 'extraResources',
        to: '/resources/extraResources'
      }
    }
  }
}
