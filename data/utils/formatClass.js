/Classe che permette di immagazzinare un viaggio e richiamare medoti utili per visualizzazione
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

    getRates() {
        return this.rates;
    }

    // Funzioni aggiuntive per dettagli sui prezzi e tariffe
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
