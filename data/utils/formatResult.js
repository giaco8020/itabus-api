import { Viaggio } from './formatClass.js'

function parseViaggi(jsonData)
{

    const viaggiList = []

    if (!jsonData || !jsonData.data || !jsonData.data.outbound || !jsonData.data.outbound.routes)
    {
        console.error('jsonData - formato JSON non valido')
        return { success: false, error: 'Formato JSON non valido'}
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
                console.warn('Mancano dati essenziali')
                continue;
            }

            const viaggio = new Viaggio(direction, travel_duration, service_name, origin, destination, departure_timestamp, arrival_timestamp, rates)
            viaggiList.push(viaggio);

        } catch (err)
        {
            console.error('Errore nel parsing del viaggio:', err.message);
            return { success: false, error: 'Errore durante il parsing di uno dei viaggi.' };
        }
    }

    if (viaggiList.length === 0)
    {
        return { success: false, error: 'Nessun viaggio valido trovato.' }
    }

    return { success: true, data: viaggiList }
}

export { parseViaggi }
