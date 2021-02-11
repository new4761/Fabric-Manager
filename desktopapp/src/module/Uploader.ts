
const { dialog } = require('electron').remote
const path = require('path');
const fse = require('fs-extra')
const fs = require('fs')
class Uploader {
    constructor() {}
    // use dialog box 
    // upload all content in directly to destination 
    upLoadDir(destDir: string):any {
        return dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
            //console.log(result.canceled)
           // console.log(result.filePaths)
            this.copyFilesDir(result.filePaths[0], destDir)
            return result.filePaths[0]
        }).catch(err => {
            console.log(err)
        })


    }
    // use dialog box 
    // upload only one file in directly to destination 
    upLoadFile(destDir: string):any {
        dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
            //console.log(result.canceled)
            //console.log(result.filePaths)
            this.copyFile(result.filePaths[0], destDir)
            return result.filePaths[0]
        }).catch(err => {
            console.log(err)
        })


    }
    // call through to copy file
    copyFile(sourceDir: any, destDir: string) {
        let fileName = path.basename(sourceDir)
        console.log(fileName)
        fs.copyFile(sourceDir, path.join(destDir, fileName), (err: any) => {
            if (err) throw err;
            console.log('success');
        });

    }
    // call through to copy files
    copyFilesDir(sourceDir: any, destDir: string) {
        fse.copy(sourceDir, destDir)
            .then(() => console.log('success!'))
            .catch((err: any) => console.error(err))
    }
}
export default new Uploader()