const fs = require('fs')
const path = require('path')
const baseDir = path.join(__dirname, '../contesting-parties')
const utilities = require('./utilities')
const { error } = require('console')






class election {

// create new files

createNewParties(name, data){
    // verifies that files < 3
   const noOfFiles = utilities.numberOfPartiesCreated()
  
  const validateInput = utilities.validate(name, data)

    const filepath = path.join(baseDir, name);
    const parties = []
     // Check if the party already exists
            if (fs.existsSync(filepath) === true) {
                    console.log('File already exists');
                    return ;
                }
            else {
                
   fs.appendFile(filepath, data, function (err,data) {
            if(err) {
            throw err
            }
            else {
                    return data;
                }
            })
        parties.push(data)
       console.log( parties)
        }
        return parties
    }
    
    // read content of all files in the directory
readAllCreatedParties(){
    const parties = []
    const files = utilities.readDirectory()
 files.forEach(function(file)
{
    const filePath = path.join(baseDir, file)
 const content =  utilities.readFileContent(filePath)
 parties.push(JSON.parse(content))
    })
  
   return parties
}
    
// read one party
readoneParty(fileName){
    utilities.doesPartyExist(fileName)
    const filePath = path.join(baseDir, fileName)
// then read file contents
const result = utilities.readFileContent(filePath)
console.log(result)
return JSON.parse(result)
 }


 // delete one party
deleteParty(fileName){

     // first check if the party exists
     utilities.doesPartyExist(fileName)
     const parties = []
     const filePath = path.join(baseDir, fileName)
 // then delete file
 fs.unlink(filePath, function(err, data) {
    if (err) {
      console.log(err)
    }
else return
})

 }

//  update file
updateFile(name, data){
    const filepath = path.join(baseDir, name);
    // Check if the party already exists
           utilities.doesPartyExist(name)
    // read the current file
           const fileContent = utilities.readFileContent(filepath)
              // append new updates to the file
  const fileArray = JSON.parse(fileContent)
 fileArray.push(JSON.parse(data))
 const updatedFile = JSON.stringify(fileArray)
 fs.writeFile(filepath,updatedFile,function(err,data)
{
    if(err)
        throw error
    else return data
} )
return updatedFile
}
leaderBoard(){
    let jsonData;
    let sortedJson;
    let scoreSheet = []
    // read directory
   const files =  utilities.readDirectory()
// checkk length of the array for each file
files.forEach(function(file) {
    const filePath = path.join(baseDir, file);
    const content = utilities.readFileContent(filePath);
    const jsonData = JSON.parse(content);

    jsonData.forEach(party => {
        const NameOfParty = party.partyName;
        const resultScore = parseInt(party.votes);

        scoreSheet.push({
            partyName: NameOfParty,
            votes: resultScore
        });
    });
});

// Sort the scoreSheet array by votes in descending order
const totalResult = scoreSheet.sort((a, b) => b.votes - a.votes);

console.log(totalResult);
return totalResult;
}

// vote
voteAction(fileName){
    // read through the files
    // update the vote by party name
    utilities.doesPartyExist(fileName)
    const filePath = path.join(baseDir, fileName)
    const voteCount = this.readoneParty(fileName)
    const totalVotes = voteCount[0].votes
// let totalVotes =  firstObject.votes
let total = parseInt(totalVotes)
let partyVotes = total+= 1
voteCount[0].votes = partyVotes.toString()
const updatedVotes = JSON.stringify(voteCount)
console.log( updatedVotes)
const voted = fs.writeFile(filePath, updatedVotes, function(err,data){
    if (err)throw err
    else{
        return data
    }
} )
console.log(voted)
return voted;




}
}


const endPoint = new election()
module.exports = endPoint



// nums.sort(function (a,b){return a-b})