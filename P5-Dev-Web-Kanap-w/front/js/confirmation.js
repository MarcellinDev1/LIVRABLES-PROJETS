/**
 * Récupère l'ID de commande à partir de l'URL de la page.
 *
 * @function getOrderIdFromUrl
 * @returns {string|null} L'ID de commande extrait de l'URL, ou `null` si non trouvé.
 */
function getOrderIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("orderId"); // Récupère la valeur de "orderId"
}

/**
 * Écoute l'événement `DOMContentLoaded` pour récupérer et afficher l'ID de commande.
 * Met à jour dynamiquement le champ correspondant sur la page.
 *
 * @event DOMContentLoaded
 */
document.addEventListener("DOMContentLoaded", () => {
const orderId = getOrderIdFromUrl();
console.log(orderId);
if (orderId) {
    const orderIdField = document.querySelector("#orderId");
    orderIdField.innerText = orderId;
    console.log("Order ID récupéré :", orderId);
}
});