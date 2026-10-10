exports.authController = (req, res) => {
    const { username, password } = req.body; // Estrae username e password dal corpo della richiesta JSON.

    if (username === "admin" && password === "1234") { // Controlla se le credenziali sono corrette.
        res.json({ // Se corrette, risponde con un messaggio di successo e un token fittizio.
            success: true,
            message: "Autenticazione riuscita",
        });
    }
}