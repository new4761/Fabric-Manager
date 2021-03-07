
const { dialog } = require('electron').remote
const path = require('path');
const fse = require('fs-extra')
const fs = require('fs')
//const isDevelopment = process.env.NODE_ENV !== "production"
class FileManager {
    // write all function who handle normal files (etc not yaml,json )



    constructor() { }
    // use dialog box 
    // get all content in directory to destination
    //catch it with   undefined con
    getDirPath(): any {
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
    getFilePath(): any {
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
    removeFile() { }

    removeDir(destDir: string) {
        fse.removeSync(destDir)
            .then(() => console.log('removeDir success!'))
            .catch((err: any) => console.error(err))

    }
    //to do remove all files in directory
    cleanUpDir() { }

    readFile(sourceDir: string) {

        return fs.readFileSync(sourceDir, 'utf8', (err: any, data: any) => {
            if (err) {
                console.error(err)
                return
            }
            //console.log(data)
            return data
        })
    }
    WaitToReadFile(sourceDir: string) {
        if (fs.existsSync(sourceDir)) {
            return fs.watch(sourceDir)
        }
        else {
            // console.log("fuck u")
        }

    }
    //TODO : add overwrite condition
    createFile(destDir: string) {
        //console.log(sourceDir)
        if (!fs.existsSync(destDir)) {
            fs.writeFileSync(destDir, function (err: any) {
                if (err) throw err;
                console.log('Saved!');
            });
        }
    }
    createFileWithData(destDir: string,data:string) {
        //console.log(sourceDir)
 
            fs.writeFileSync(destDir,data, function (err: any) {
                if (err) throw err;
                console.log('Saved!');
            });
        
    }

    // call through to copy file
    copyFile(sourceDir: any, destDir: string) {
        let fileName = path.basename(sourceDir)
        // console.log(fileName)
        fs.copyFile(sourceDir, path.join(destDir, fileName), (err: any) => {
            if (err) throw err;
            console.log('success');
        });

    }
    // call through to copy files
    copyFilesDir(sourceDir: any, destDir: string) {
        fse.copy(sourceDir, destDir)
            .then(() => console.log('copyFilesDir success!'))
            .catch((err: any) => console.error(err))
    }
    createDir(destDir: string, folderName: string) {
        let target = path.join(destDir, folderName)
        if (!fs.existsSync(target)) {
            fs.mkdir(target, (err:any) => {
                if (err) {
                    return console.error(err);
                }
                console.log('Directory created successfully!');
            });
        }
    }
}
export default new FileManager()
