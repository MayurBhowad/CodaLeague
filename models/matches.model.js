const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    home_team: {
        type: Schema.Types.ObjectId, ref: 'Teams'
    },
    challenger: {
        type: Schema.Types.ObjectId, ref: 'Teams'
    },
    winner: {
        type: String,
        default: 'YTD'
    },
    looser: {
        type: String,
        default: 'YTD',
    },
    tie: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        require: true
    },
    date_added: {
        type: Date,
        default: Date.now
    }
})

module.exports = Matches = mongoose.model('matches', matchSchema);