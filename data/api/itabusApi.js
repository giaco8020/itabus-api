const axios = require('axios');

const { parseViaggi, checkDateFormat } = require('../utils/formatResult.js');
const { Stazione } = require('../utils/formatClass.js');

/* Load Json File*/
const data = require('../utils/stations.json');

/* Init StationsMap from JsonFile */
const stationsMap = {}
data.data.forEach(station => {
    stationsMap[station.name.toLowerCase()] = new Stazione(station.code, station.city, station.address, station.destinations)
});
//console.log(stationsMap)

/* Function to return Stations Element */
function find_station(stationT)
{
    const res = stationsMap[stationT.toLowerCase()]

    if(res === undefined)
    {
        return { success: false, error: 'Invalid station' }
    }

    return { success: true, data: res }
}

//FORMATO DATA CORRETTO --> "2023-04-19"
async function search_ticket(departure, destination, date)
{
    if(checkDateFormat(date) === false)
    {
        return { success: false, error: 'Invalid date format' }
    }

    const code_departure = find_station(departure)
    const code_destination = await find_station(destination)

    if(code_departure === undefined || code_destination === undefined)
    {
        return { success: false, error: 'Invalid departure e/o destination' };
    }

    //console.log(code_departure.getCity())
    //console.log(code_destination.getCity())

    //Endpoint --> https://www.itabus.it/on/demandware.store/Sites-ITABUS-Site/it/Api-Travels?
    const params = `origin=${code_departure.getCode()}&destination=${code_destination.getCode()}&datestart=${date}&adults=1&children=0&membership=false&code=`;
    const endpoint = "https://www.itabus.it/on/demandware.store/Sites-ITABUS-Site/it/Api-Travels?" + params;


    const response = await axios.get(endpoint)
        .catch(function (error) {
            if (error.response) {
                return { success: false, error: `ERROR -- statusCode response [${response.status}] ` };
            }
            else if (error.request)
            {
                return { success: false, error: `ERROR -- Request Failed ` };
            }
            else
            {
                return { success: false, error: `ERROR -- General Error... ` };
            }

        });

    return parseViaggi(response.data)
}


module.exports = { search_ticket, find_station }