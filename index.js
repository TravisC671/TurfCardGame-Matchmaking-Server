//this is the matchmakingServer
const express = require('express');
var cors = require('cors');
const app = express();

app.use(cors())
//const bodyParser = require('body-parser');

var requestCounter = 0;

//a user will send a request with their MMR, it will be sorted then will check its neighbors to see if they are in range
//TODO make it so it will recheck after an interval with a larger scope
//TODO Verify the user's MMR
var users = []


app.get('/', function (req, res) {
    console.log(req.headers.userid)
    let userId
    let mmr
    let isMatchFound = false
    userId = req.headers.userid
    mmr = req.headers.mmr
    if (mmr == undefined || userId == undefined) {
        res.status(500).send('headers not working');
        return
    }

    //change where you push the data into
    users.forEach( ( user, index ) => {
        //range of mmr
        let mmrRange = 5
        if ( Math.abs( user.mmr - mmr) <= mmrRange )
        {
            console.log('join match')
            isMatchFound = true
            user.res.status(200).send({roomID: "test1", password: "abce"})
            res.status(200).send({roomID: "test1", password: "abce"})
            users.splice(index, 1);
        }

        //console.log(user.mmr)
    })
    
    if (!isMatchFound) {
        users.push({userId: userId, mmr: mmr, queTime: new Date, res: res})
    }
    //console.log(users)
});

//app.use(bodyParser.text({ type: 'text/*' }));
//app.use(bodyParser.json());

app.listen(3001, function () {
    console.log('app listening on port 3001!')
})