function validateCity(city) {
    const regex = /^[a-zA-Z\s]+$/; // Definisce un'espressione regolare per validare il nome della città (solo lettere e spazi).
    return typeof city === "string" &&
        city.trim().length > 1 && 
        regex.test(city.trim()); // Restituisce true se la città è una stringa e corrisponde al pattern, altrimenti false.

}
    
module.exports = {validateCity}; // Esporta la funzione validateCity per essere utilizzata in altri moduli.