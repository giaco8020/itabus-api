const expect = require('chai').expect;
const ItabusAPI = require("../Itabus.js");


test = new ItabusAPI()

describe('Test ItabusAPI', function() {

    describe('find_station_TEST', function() {
        it('Insertion of an invalid station', function() {
            const result = test.get_station('StationX');
            expect(result).to.deep.equal({ success: false, error: 'Invalid station' });
        });

    });

    describe('search_ticket_TEST', function() {

        it('Wrong date format', async function() {
            const result = await test.search_tickets('Bologna', 'MilanP', 'AA-33-33');
            expect(result).to.deep.equal({ success: false, error: 'Invalid date format' });
        });

        it('Invalid departure station', async function() {
            const result = await test.search_tickets('Bologna', 'MilanP', '2023-10-01');
            expect(result).to.deep.equal({ success: false, error: 'Invalid departure e/o destination' });
        });

        it('Invalid arrival station', async function() {
            const result = await test.search_tickets('Bologna1', 'Milano', '2023-10-01');
            expect(result).to.deep.equal({ success: false, error: 'Invalid departure e/o destination' });
        });

    });

});
