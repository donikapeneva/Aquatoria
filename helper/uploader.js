'use strict'

const fs = require('fs-extra'),
    path = require('path');

module.exports = {
    uploadFile(file, uploadPathToFolder, uploadedFileName){
        return new Promise((resolve, reject) => {
            let tempPath = file.path,
                openedFileName = file.name,
                fileExtension = openedFileName.substring(openedFileName.lastIndexOf('.'), openedFileName.length).toLowerCase();

            uploadedFileName += fileExtension;

            if(!fs.existsSync(uploadPathToFolder)){
                fs.mkdirSync(uploadPathToFolder);
            }

            let pathToNewFile = path.join(uploadPathToFolder, uploadedFileName);

            fs.copy(tempPath, pathToNewFile, (err) => {
                if(err){
                    reject(err);
                }

                fs.remove(tempPath, (err) => {
                    if(err){
                        resolve(err);
                    }
                });

                resolve(uploadedFileName);
            });
        });
    }
};
