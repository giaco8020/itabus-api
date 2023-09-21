class Stazione {
    constructor(code, city, address, destinations) {
        this.code = code;
        this.city = city;
        this.address = address;
        this.destinations = destinations;
    }

    /**
     * @returns Id of Station
     */

    getCode() {
        return this.code;
    }

    /**
     * @returns City of Station
     */
    getCity() {
        return this.city;
    }

    /**
     * @returns Address of Station
     */
    getAddress() {
        return this.address;
    }

    /**
     * @returns List of available destinations from this station
     */
    getDestinations() {
        return this.destinations;
    }
}

class Viaggio {
    constructor(direction, travel_duration, service_name, origin, destination, departure_timestamp, arrival_timestamp, rates) {
        this.direction = direction;
        this.travel_duration = travel_duration;
        this.id = service_name;
        this.origin = origin;
        this.destination = destination;
        this.departure_timestamp = new Date(departure_timestamp);
        this.arrival_timestamp = new Date(arrival_timestamp);
        this.rates = rates;
    }

    /**
     * @returns get travel direction
     */
    getDirection() {
        return this.direction;
    }

    /**
     * @returns HH:MM travel duration
     */
    getTravelDuration() {
        return this.travel_duration;
    }

    /**
     * @returns get itabus' id associated by travel
     */
    getId() {
        return this.id;
    }

    /**
     * @returns get travel departure
     */
    getOrigin() {
        return this.origin;
    }

    /**
     * @returns get travel destination
     */
    getDestination() {
        return this.destination;
    }

    getDepartureTimestamp() {
        return this.departure_timestamp;
    }

    getArrivalTimestamp() {
        return this.arrival_timestamp;
    }

    /**
     * @returns get departure time (HH:MM)
     */
    getDepartureTime()
    {
        return estraiOrario(this.getDepartureTimestamp())
    }

    /**
     * @returns get arrival time (HH:MM)
     */
    getArrivalTime()
    {
        return estraiOrario(this.getArrivalTimestamp())
    }

    /**
     * @returns get travel's rates
     */
    getRates() {
        return this.rates;
    }

    getBasicPrice() {
        return this.rates.BASIC?.price;
    }

    getFlexPrice() {
        return this.rates.FLEX?.price;
    }

    getBasicExtraPrice() {
        return this.rates.BASIC_EXTRA?.price;
    }

    getFlexExtraPrice() {
        return this.rates.FLEX_EXTRA?.price;
    }
}

class Results {
    constructor(tickets) {
        this.tickets = tickets
    }

    /**
     * @returns get all tickets found
     */
    getTickets()
    {
        return this.tickets
    }

    /**
     * @returns get cheapest trip
     */
    getCheapestTrip() {
        return this.tickets.sort((a, b) => {
            // Assuming BASIC price is the standard fare
            return a.getBasicPrice() - b.getBasicPrice();
        })[0];
    }

    /**
     * @returns get shortest trip
     */
    getShortestTrip() {
        return this.tickets.sort((a, b) => {
            return a.getTravelDuration() - b.getTravelDuration();
        })[0];
    }


    getTripsWithFlexRate() {
        return this.tickets.filter(viaggio => {
            return viaggio.getFlexPrice() !== undefined;
        });
    }

}

module.exports = { Stazione, Viaggio, Results }