const fetch = require("node-fetch"); // Importa node-fetch per fare richieste HTTP (non utilizzato in questo codice).


module.exports.weatherController = async (req, res) => {
    const city = req.body.city; // Estrae il nome della città dal corpo della richiesta JSON.
    const apiKey = "f66274f8e26faa7e083092680d39fc79";

    try { // Inizia un blocco per catturare eventuali errori.
        // Chiama l'API di OpenWeatherMap passando città, chiave e unità metriche.
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`
        );

        const data = await response.json();

        // Se la risposta HTTP non è 200, la città non è stata trovata.
        if (response.status !== 200) {
            return res.json({
                error: true,
                message: "Città non trovata"
            });
        }

        // Risponde al client con i dati meteo più rilevanti.
        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed
        });

    } catch (error) { // Se la chiamata all'API fallisce.
        console.error("Errore durante la richiesta meteo:", error.message); // Scrive l'errore in console.
        res.json({
            error: true,
            message: "Errore nel recupero dei dati meteo"
        });
    }
};
