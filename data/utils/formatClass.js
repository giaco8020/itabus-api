const { estraiOrario } = require('./formatResult.js');

class Stazione {
    constructor(code, city, address, destinations) {
        this.code = code;
        this.city = city;
        this.address = address;
        this.destinations = destinations;
    }

    getCode() {
        return this.code;
    }

    getCity() {
        return this.city;
    }

    getAddress() {
        return this.address;
    }

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

    getDirection() {
        return this.direction;
    }

    getTravelDuration() {
        return this.travel_duration;
    }

    getId() {
        return this.id;
    }

    getOrigin() {
        return this.origin;
    }

    getDestination() {
        return this.destination;
    }

    getDepartureTimestamp() {
        return this.departure_timestamp;
    }

    getArrivalTimestamp() {
        return this.arrival_timestamp;
    }

    getDepartureTime()
    {
        return estraiOrario(this.getDepartureTimestamp())
    }

    getArrivalTime()
    {
        return estraiOrario(this.getArrivalTimestamp())
    }

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

    getTickets()
    {
        return this.tickets
    }

    getCheapestTrip() {
        return this.tickets.sort((a, b) => {
            // Assuming BASIC price is the standard fare
            return a.getBasicPrice() - b.getBasicPrice();
        })[0];
    }

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

    getTripsFromTime(startTimeString) {
        const fullDateString = `${this.getTickets()[0].getDate()}T${startTimeString}:00`;
        const startTime = new Date(fullDateString);

        return this.tickets.filter(viaggio => {
            return viaggio.getDepartureTimestamp() >= startTime;
        });
    }

}

module.exports = { Stazione, Viaggio }