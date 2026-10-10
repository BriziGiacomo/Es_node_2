// Questo file definisce la route che gestisce le richieste di autenticazione.
// Il controller si occupa di gestire il processo di autenticazione.

const express = require("express"); // Importa il framework Express.
const router = express.Router(); // Crea un router Express per raggruppare le rotte.

const { authController } = require("../controllers/authController"); // conette il controller dal controller.

router.post("/auth", authController); // Associa la route POST /auth alla funzione del controller.

module.exports = router; // Esporta il router per essere usato nel server.