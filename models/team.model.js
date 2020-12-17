const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    team_name: {
        type: String,
        require: true
    },
    wins: {
        type: Number,
        default: 0
    },
    losses: {
        type: Number,
        default: 0
    },
    ties: {
        type: Number,
        default: 0
    },
    score: {
        type: Number,
        default: 0
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Teams = mongoose.model('teams', teamSchema);