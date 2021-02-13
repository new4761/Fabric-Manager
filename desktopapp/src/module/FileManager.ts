
const { dialog } = require('electron').remote
const path = require('path');
const fse = require('fs-extra')
const fs = require('fs')
class FileManager {
    // write all function who handle normal files (etc not yaml,json )



    constructor() {}
    // use dialog box 
    // get all content in directory to destination
    //catch it with   undefined con
    getDirPath():any {
        return dialog.showOpenDialog({ properties: ['openDirectory'] }).then(result => {
            //console.log(result.canceled)
           // console.log(result.filePaths)
           // this.copyFilesDir(result.filePaths[0], destDir)
            return result.filePaths[0]
        }).catch(err => {
          //  console.log(err)
            return err
        })


    }
    // use dialog box 
    // get only one file in directory to destination 
    //catch it with undefined con
    getFilePath():any {
        dialog.showOpenDialog({ properties: ['openFile'] }).then(result => {
            //console.log(result.canceled)
            //console.log(result.filePaths)
           // this.copyFile(result.filePaths[0], destDir)
            return result.filePaths[0]
        }).catch(err => {
            //console.log(err)
            return err
        })


    }
    //to do  remove file function
    removeFile(){}
    //to do remove all files in directory
    cleanUpDir(){}



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
export default new FileManager()
