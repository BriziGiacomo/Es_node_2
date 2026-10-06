var express = require("express");
var path = require("path");
var app = express();
var port = 3000;
var bodyParser = require("body-parser");

// il body parser serve per leggere i dati inviati dal form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "../../frontend/public")));

app.get("/", (req, res) =>{ //when the user accesses localhost:3000 he must specify the path /login to access the login page, otherwise he will a get error
    res.sendFile(path.join(__dirname, "../../frontend/public/index.html"));
});

//pagina di login
app.get("/login", (req, res) =>{ 
    res.sendFile(path.join(__dirname, "../../frontend/public/login.html"));
});

//pagina about
app.get("/about", (req, res) =>{
    res.sendFile(path.join(__dirname, "../../frontend/public/about.html"));
});

//pagina di signing
app.get("/signing", (req, res) =>{ 
    res.sendFile(path.join(__dirname, "../../frontend/public/signing.html"));
});

app.get("/weather", (req, res) =>{ 
    res.sendFile(path.join(__dirname, "../../frontend/public/weather.html"));
});

//post per il login, se username e password sono corretti, invia un messaggio di successo, altrimenti invia un messaggio di errore
app.post('/login', (req, res) =>{
    const{username, password} = req.body;

    if(username === 'admin' && password === '1234'){
        res.send('Login è avvenuto con successo!');
    } else {
        res.send('Login fallito. <br> Username inserito: ' + username + ' <br> Password inserita: ' + password + '.');
    }
});

//post per il weather, riceve la città dal form e invia una risposta con le informazioni meteorologiche
app.post('/weather', async (req, res) =>{
    const{city} = req.body;
    console.log(city);
    
    const apiKey="f66274f8e26faa7e083092680d39fc79";

    try{

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`
        );

        const data = await response.json();

        if(data.cod !== 200){
            return res.json({
                error:true,
                message: "Città non trovata"
            });
        }

        // risposta json pulita
        res.json({
            city: data.name,
            description: data.weather[0].description,
            icon: data.weather[0].icon,
            temperature: data.main.temp,
            humidity: data.main.humidity,
            wind: data.wind.speed
        });

    }catch(err){
        console.error(err);
        res.json({
            error:true,
            message: "Errore nel server"
        });
    }
    
    
});

//definizione dello stato visualizzabile da prompt
app.listen(port, ()=> {
    console.log("Server in ascolto alla porta " + port);
    console.log('accedi all indirizzo http://localhost:'+port)
});






