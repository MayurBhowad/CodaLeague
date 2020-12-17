
const axios = require('axios');

const Teams = require('../models/team.model');

module.exports = getTeams = () => {
    axios.get('https://s3-ap-southeast-1.amazonaws.com/he-public-data/Leaderboard_Initial_Dataset65148c7.json')
        .then(data => {
            return new Promise((resolve, reject) => {
                console.log(data.status);
                if (!data) {
                    reject('No data found!')
                }
                resolve(data.data);
            })
        })
}

module.exports = teamVerification = (team) => {
    // console.log('line 20: ', team);
    return new Promise((resolve, reject) => {
        // console.log(team);
        if (!team) {
            reject('No data found!')
        }
        let teamAlreadyAdded = false;
        Teams.findOne({ _id: team }).then(teamFound => {
            // console.log(teamFound);
            if (!teamFound) {
                teamAlreadyAdded = false
            } else {
                teamAlreadyAdded = true
            }
            resolve(teamAlreadyAdded);
        }).catch(e => {
            if (e) {
                teamAlreadyAdded = false
            }
            resolve(teamAlreadyAdded);
        })
    })
}