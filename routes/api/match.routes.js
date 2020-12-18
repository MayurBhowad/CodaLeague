const express = require('express')
const axios = require('axios');
const router = express.Router();

const Teams = require('../../models/team.model');
const Matches = require('../../models/matches.model');
const teamVerification = require('../../functions/Data.func');

const s3TeamsData = `https://s3-ap-southeast-1.amazonaws.com/he-public-data/Leaderboard_Initial_Dataset65148c7.json`

//@desc     GET testing
//@route    /matches/testing
//access    public
router.get('/testing', async (req, res) => {
    res.send('Mathc Route accessesible!')
});

//@desc     GEt all Upcomming Match details
//@route    /matches/all_upcomming_matches
//access    public
router.get(`/all_upcomming_matches`, (req, res) => {
    const page = req.query.page;
    const limit = req.query.limit;
    const result = {}

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    Matches.find({}).populate(['home_team', 'challenger']).then(all => {
        result.totalMatches = all.length;
        result.matches = all.slice(startIndex, endIndex)
        res.status(200).json(result);
    })
})

//@desc     GEt Match details by team names
//@route    /matches/match_details
//access    public
router.get('/get_match_details', (req, res) => {
    const homeTeam = req.body.home_team;
    const challenger = req.body.challenger

    Matches.find({ home_team: homeTeam, challenger: challenger }).populate('home_team', 'challenger').then(a => {
        console.log(a);
        if (!a.length > 0) {
            res.json({ message: 'not found!' });
        } else {
            res.json(a);
        }
    })
})

//@desc     POST
//@route    /matches/new_match_data
//access    public
router.post('/new_match_data', async (req, res) => {
    const homeTeam = req.body.home_team;
    const challenger = req.body.challenger;
    const error = {}

    const isHomeTeam = await teamVerification(homeTeam)
    console.log(isHomeTeam);
    const isChallenger = await teamVerification(challenger)
    console.log(isChallenger);

    if (!isHomeTeam) {
        error.home_team = 'home team not yet registered!'
    }
    if (!isChallenger) {
        error.challenger = 'challenger not registered!'
    }

    if (error.home_team && error.challenger) {
        console.log('errors');
        res.status(301).json(error);
    } else {
        console.log('creating');
        const newMatchData = new Matches({
            home_team: homeTeam,
            challenger: challenger,
            winner: req.body.winner,
            looser: req.body.looser,
            tie: req.body.isTie
        })
        newMatchData.save().then(a => { res.json(a) })
    }
})

//@desc     POST result data
//@route    /matchs/match_result
//access    public
router.post('/match_result', (req, res) => {
    const homeTeam = req.body.home_team;
    const challenger = req.body.challenger;
    const winner = req.body.winner;
    const looser = req.body.looser;
    const isTie = req.body.isTie;
    const teamss = [homeTeam, challenger];
    console.log(isTie);


    if (isTie) {
        const matchDetails = [];
        var teamsLoop = new Promise((resolve, reject) => {
            teamss.forEach((element, index, array) => {
                Teams.findOne({ team_name: element }).then(team => {
                    Teams.updateOne({ _id: team._id }, { $inc: { score: 1, ties: 1 } }, { new: true })
                        .then(teamUptd => {
                            // matchDetails.push(team);
                            if (index === array.length - 1) resolve();
                        });
                })
            });
        })

        teamsLoop.then(() => {
            var teamsLoop = new Promise((resolve, reject) => {
                teamss.forEach((element, index, array) => {
                    Teams.findOne({ team_name: element }).then(team => {
                        matchDetails.push(team);
                        if (index === array.length - 1) resolve();
                    })
                });
            })
            teamsLoop.then(e => res.status(200).json(matchDetails))
        })

    }
    if (!isTie) {
        const matchDetails = [];
        var teamsLoop = new Promise((resolve, reject) => {
            teamss.forEach((element, index, array) => {
                Teams.findOne({ team_name: element }).then(team => {
                    console.log(team.team_name);
                    if (winner !== null || winner !== '') {
                        if (team.team_name === winner) {
                            Teams.updateOne({ _id: team._id }, { $inc: { score: 3, wins: 1 } }, { new: true })
                                .then(teamUptd => {
                                    if (index === array.length - 1) resolve();
                                });
                        }
                    }
                    if (looser !== null) {
                        if (team.team_name === looser) {
                            Teams.updateOne({ _id: team._id }, { $inc: { losses: 1 } }, { new: true })
                                .then(teamUptd => {
                                    if (index === array.length - 1) resolve();
                                });
                        }
                    }
                })
            });
        })

        teamsLoop.then(() => {
            var teamsLoop = new Promise((resolve, reject) => {
                teamss.forEach((element, index, array) => {
                    Teams.findOne({ team_name: element }).then(team => {
                        matchDetails.push(team);
                    })
                });
            })
            teamsLoop.then(e => res.status(200).json(matchDetails))
        })

    }

})



//@desc     POST New GAme
//@route    add/new_game
//access    public
router.post('/add/new_game', (req, res) => {
    const home_team = req.body.home_team;
    const challenger = req.body.challenger;
    const date = req.body.date
    const error = {}

    const newGame = new Matches({
        home_team: home_team,
        challenger: challenger,
        date: date
    });

    newGame.save().then((newGame) => {
        res.json(newGame)
    }).catch(err => {
        error.faildMsg = err.message
        res.json(error)
    })
})


//@desc     POST gwt team data by team_name
//@route    /team_details/:team_name
//access    public

router.get('/get/single_match/:team_id', (req, res) => {
    Matches.findOne({ id: req.params.team_name }).populate(['home_team', 'challenger']).then(team => {
        res.json(team);
    })
})








module.exports = router;