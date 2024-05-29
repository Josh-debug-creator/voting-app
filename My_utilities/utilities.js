const path = require('path');
const fs = require('fs');
const baseDir = path.join(__dirname, '../contesting-parties')
// const options = require('./My_utilities/index')



class utilityCodes {

// read the diretory (contesting parties folder)
readDirectory(){
    const fileContent = fs.readdirSync(baseDir)
    return fileContent
}


// check if file does not exists
doesPartyExist(file){
    let fileName = path.join(baseDir, file)
   const files =  fs.existsSync(fileName)
   if (files === false)
    {
        console.log('Does not exist, create file')
        return
    }
    
}

// check if file exists
partyExist(file){
  let fileName = path.join(baseDir, file)
  const result = fs.existsSync( fileName)
  return result
}

    // read number of files in the contesting-parties directory
    numberOfPartiesCreated(){
            const noOfFiles = fs.readdirSync(baseDir)
            if (noOfFiles.length >= 3)
                {
                     console.log('Invalid: maximum number of parties created');
            return;
            }
                   return noOfFiles.length
        }
    
        // validate input and data
        validate(name,data){
  // Validate input
  if (typeof name !== 'string' || name.trim() === '') {
    console.log('Invalid name');
    return 'Invalid name';
  }
//   validate data
  if (typeof data !== 'string' || data.trim() === '') {
    console.log('Invalid data');
    return 'Invalid data';
  }

        }
// read file content
readFileContent(filePath){
  const fileContent = fs.readFileSync(filePath, 'utf-8')
  return fileContent
}

   
  }
    
const utilities = new utilityCodes()
module.exports = utilities



