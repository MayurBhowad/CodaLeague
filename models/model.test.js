const mongoose = require('mongoose');

const mongoDB = process.env.MONGO_URI;
mongoose.connect(mongoDB);
const Team = require('./team.model');

console.log(process.env.NODE_ENV);

describe('Team model test', () => {
    beforeAll(async () => {
        await Team.remove({})
    });
    afterEach(async () => {
        await Team.remove();
    });
    afterAll(async () => {
        await mongoose.connection.close();
    });

    if ('has a model', () => {
        expect(Team).toBeDefined();
    });

    describe('get user', () => {
        it('gets a user', async () => {
            const team = new Team({ team_name: 'foo', wins: 1, losses: 1, ties: 0, score: 1 });
            await team.save();

            const foundUser = await Team.findOne({ team_name: 'foo' });
            const expected = 'foo';
            const actual = foundUser.team_name;
            expect(actual).toEqual(expected);
        })
    });
})