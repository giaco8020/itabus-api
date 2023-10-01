
# itabus-api
![version](https://img.shields.io/npm/v/itabus-api "Version")
![npm](https://img.shields.io/npm/dt/itabus-api.svg "Total Downloads")

Access to Itabus's unofficial API with object-oriented promises.

Itabus is an Italian road transport company operating exclusively within Italy.

The name of the stations is accepted only in Italian! 
Example: 
        * 'MILANO' is valid station
        * 'MILAN' is not valid station
The project is developed for information purposes. 
**Do not use this code for evil purposes and respect the service offered. **

## Installation 
```
npm install itabus-api
```

# Features
* Search tickets
* Station retrieval


# How To Use - Search tickets
```js
const ItabusAPI = require("itabus-api")
const Itabus = new ItabusAPI()

// DATE FORMAT --> "YYYY-MM-DD"
Itabus.search_tickets("Milano", "Bologna", "2023-10-10")
    .then(request => {

        if(request.success === false){
            console.log(request.error)
        }
        else{
            const Results = request.data

            // Get all travel ticket solutions
            console.log(Results.getTickets())

            // Get the ticket with the shortest trip
            console.log(Results.getShortestTrip())

            // Get the ticket with the cheapest trip
            console.log(Results.getCheapestTrip())

            // For each ticket, you can extract individual information
            const exampleTicket = Results.getTickets()[0]

            console.log(exampleTicket.getTravelDuration())
            console.log(exampleTicket.getId())
            console.log(exampleTicket.getOrigin())
            console.log(exampleTicket.getDestination())
            console.log(exampleTicket.getDepartureTimestamp())
            console.log(exampleTicket.getArrivalTimestamp())
            console.log(exampleTicket.getRates())
            console.log(exampleTicket.getBasicPrice())
        }
    })
    .catch(err => console.log(`Error searching: ${err.message}`));

```

# How To Use - Station retrieval
```js
const ItabusAPI = require("itabus-api")
const Itabus = new ItabusAPI()

const result = Itabus.get_station("Milano")

if(result.success === false){
    console.log(result.error)
} else {
    console.log(result.data)

    //Id of Station
    console.log(result.data.getCode())

    //City of Station
    console.log(result.data.getCity())

    //Address of Station
    console.log(result.data.getAddress())

    //List of available destinations from this station
    console.log(result.data.getDestinations())
}
```
