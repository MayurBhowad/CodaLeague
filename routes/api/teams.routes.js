const express = require('express')
const axios = require('axios');
const router = express.Router();

const Teams = require('../../models/team.model');
const Matches = require('../../models/matches.model');
const teamVerification = require('../../functions/Data.func');

const s3TeamsData = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/Leaderboard_Initial_Dataset65148c7.json`

//@desc     GET testing
//@route    /teams/testing
//access    public
router.get('/testing', async (req, res) => {
    res.send('team Route accessesible!')
});



//@desc     GET data from s3
//@route    https://s3-ap-southeast-1.amazonaws.com/he-public-data/Leaderboard_Initial_Dataset65148c7.json
//access    public
router.get('/all_teams', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const results = {}

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    axios.get(s3TeamsData).then(data => {
        if (!data) {
            res.status(404).json({ message: 'data not Found' });
        }

        const teamsData = data.data;
        results.totalTeams = teamsData.length;
        results.Teams = teamsData.slice(startIndex, endIndex);
        res.status(200).json(results)

    })
})

//@desc     GET data from s3 sorted by score
//@route    https://s3-ap-southeast-1.amazonaws.com/he-public-data/Leaderboard_Initial_Dataset65148c7.json
//access    public
router.get('/all_teams/sorted', (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const results = {}

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Teams.find({}).sort({ score: -1 }).then(teams => { res.json(teams) })
})



//@desc     POST gwt team data by team_name
//@route    /team_details/:team_name
//access    public
router.get('/team_details/:team_name', (req, res) => {
    const teamName = req.params.team_name;

    Teams.find({ team_name: teamName }).then(a => {
        if (a.length > 0) {
            res.json(a)
        } else {
            res.json({ message: 'Not Found!' })
        }
    })
})

//@desc     POST add team
//@route    /teams/add_team
//access    public
router.post('/add_team', (req, res) => {
    const teamName = req.body.team_name;

    Teams.find({ team_name: teamName }).then(a => {
        if (a.length > 0) {
            res.json({ message: `${teamName} already added!` })
        } else {
            const newTeam = new Teams({
                team_name: teamName
            })
            newTeam.save().then(result => { res.json(result) })
        }
    })

})






module.exports = router;