const { Viaggio, Results } = require('./formatClass.js');


function parseViaggi(jsonData)
{
    const viaggiList = []

    if (!jsonData || !jsonData.data || !jsonData.data.outbound || !jsonData.data.outbound.routes)
    {
        console.error('jsonData - Json Not Valid')
        return { success: false, error: 'Json Not Valid'}
    }

    const routes = jsonData.data.outbound.routes

    for (const route of routes) {
        try {
            const direction = route.direction
            const travel_duration = route.travel_duration
            const service_name = route.service_name
            const origin = route.origin.name
            const destination = route.destination.name
            const departure_timestamp = route.departure_timestamp
            const arrival_timestamp = route.arrival_timestamp
            const rates = route.rates

            if (!direction || !travel_duration || !service_name || !origin || !destination || !departure_timestamp || !arrival_timestamp || !rates)
            {
                console.warn('Warning -  some data not found')
                continue;
            }

            const viaggio = new Viaggio(direction, travel_duration, service_name, origin, destination, departure_timestamp, arrival_timestamp, rates)
            viaggiList.push(viaggio);

        } catch (err)
        {
            console.error('Error parsing element', err.message);
            return { success: false, error: 'Error parsing element' };
        }
    }

    if (viaggiList.length === 0)
    {
        return { success: false, error: 'No valid trips found.' }
    }

    return { success: true, data: new Results(viaggiList) }
}

//Check date format -- 'AAAA-MM-GG'
function checkDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/
    return regex.test(dateString);
}


module.exports = { parseViaggi, checkDateFormat }
