const fetch = require("node-fetch"); // Importa node-fetch per fare richieste HTTP (non utilizzato in questo codice).
const {validayeCity} = require("../utils/validateCity"); // Importa la funzione validateCity dal modulo utils.
const { getWeather } = require("../utils/apiClient"); // Importa la funzione getWeather dal modulo utils.
const { logError } = require("../utils/logger"); // Importa la funzione logError dal modulo utils.
const {WEATHER_API_KEY} = require("../utils/constant"); // Importa la chiave API dal file di configurazione.
const { normalizeWeather} = require("../utils/normalizeweatehr"); // Importa la funzione normalizeWeather dal modulo utils.


module.exports.weatherController = async (req, res) => {
    const city = req.body.city; // Estrae il nome della città dal corpo della richiesta JSON.
    const apiKey = WEATHER_API_KEY;

    if (!validateCity(city)) { // Controlla se il nome della città è valido.
        return res.json({
            error: true,
            message: "Nome città non valido"
        });
    }

    try { // Inizia un blocco per catturare eventuali errori.
        // Chiama l'API di OpenWeatherMap passando città, chiave e unità metriche.
        const data = await getWeather(city, apiKey);

        
        // Se la risposta HTTP non è 200, la città non è stata trovata.
        if (data.error || data.cod !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        // Risponde al client con i dati meteo più rilevanti.
        res.json(normalizeWeather(data));

    } catch (error) { // Se la chiamata all'API fallisce.
        logError("Errore durante la richiesta meteo: " + error.message); // Scrive l'errore in console.
        res.json({
            error: true,
            message: "Errore nel recupero dei dati meteo"
        });
    }
};
