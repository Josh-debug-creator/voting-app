const htttp = require('http')
const utilities = require('./My_utilities/utilities')
const options = require('./My_utilities/index')
const url = require('url')
// const path = require('path')
// const baseDir = path.join(__dirname,'../contesting-parties')
// create server
const server = htttp.createServer( function(req, res) {
    // parse the url
    const parsedUrl = url.parse(req.url, true);
if(req.method === 'POST' && req.url === '/create')
    // create new party
{
   let body = ''
    req.on('data',function(data){
  body += data.toString()
    } )

    req.on('end',function(){
        const result = [JSON.parse(body)]
        const fileName = result[0].partyName
        const noOfFiles = utilities.readDirectory()
        if  (fileName == '' || result[0].partyCandidate == '')
            {
                    res.writeHead(200, {"Content-Type": "text/plain"});
                    res.end('Invalid')
              
                      }
         else if  (utilities.partyExist(fileName) === true) {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end('File already exists')
        }
        else if (noOfFiles.length >= 3)
        {
            res.writeHead(500, {"Content-Type": "text/plain"});
            res.end('Maximum limit exceeded')
        }
       
    else {
       
     const answer = options.createNewParties(fileName,JSON.stringify(result))  
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.end('File created')
   }  
}
)
}

else if(req.method === 'GET' && req.url === '/')
    // read all party details
{
const registeredParties = options.readAllCreatedParties()
console.log((registeredParties))
res.writeHead(200, {"Content-Type": "text/plain"});
res.end(JSON.stringify(registeredParties))
}


else if(req.method === 'GET' && (req.url).includes ('/read-one'))
    // read one party details
    {
if (parsedUrl.query.url === 'PDP')
{
    let party = parsedUrl.query.url
    const partyDetails = options.readoneParty(party)
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end(JSON.stringify(partyDetails));
}
else {
    res.writeHead(404, { "Content-Type": "text/plain" });
                res.end('Not found');
}
    }
    


else if(req.method === 'GET' && (req.url).includes('/delete-one'))
    // delete one party
    {
        if (parsedUrl.query.url === 'APC')
            {
                const partyDetails = options.deleteParty(req.url)
                res.writeHead(200, {"Content-Type": "text/plain"});
                res.end('Deleted')
            }
else {
    res.writeHead(500, {"Content-Type": "text/plain"});
                res.end('Invalid')
}
}
else if(req.method === 'GET' && (req.url).includes('/vote'))
    {
        // vote
        let body = ''
    req.on('data',function(data){
  body += data.toString()
    } )
    req.on('end',function(){
        const result = [JSON.parse(body)]
        const fileName = result[0].partyName
const vote = options.voteAction(fileName)
res.writeHead(200, {"Content-Type": "text/plain"});
     res.end('Voted successfully')
    })
}

else if(req.method === 'POST' && (req.url).includes ('/update-one'))
    {
// update the file
if (parsedUrl.query.url === 'APC'){
let body = ''
let party = parsedUrl.query.url
    req.on('data',function(data){
  body += data.toString()
    } )

    req.on('end',function(){
        const result = JSON.parse(body)
      const updatedFile = options.updateFile(party, JSON.stringify(result))
      console.log(updatedFile)
     res.writeHead(200, {"Content-Type": "text/plain"});
     res.end(updatedFile)
   }  )

}
}
else if(req.method === 'GET' && (req.url).includes('/leaderboard'))
    {
const leaderboard = options.leaderBoard()
res.writeHead(200, {"Content-Type": "text/plain"});
     res.end(JSON.stringify(leaderboard))
    }
else {
    res.writeHead(404, {"Content-Type": "text/plain"});
     res.end('Not found')
}
})

// listen to the server
server.listen(3000,()=>{
    console.log('listening to port')
})