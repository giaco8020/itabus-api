const { search_ticket, find_station } = require('./api/itabusApi.js')

module.exports = class Itabus {

    /**
     *
     * @param {string} departure - Departure station
     * @param {string} destination - Destination station
     * @param {string} date - Travel date in YYYY-MM-DD format
     */
    async search_tickets(departure, destination, date)
    {
        return search_ticket(departure, destination, date)
    }

    /**
     *
     * @param {string} station
     */
    get_station(station)
    {
        return find_station(station)
    }

}




