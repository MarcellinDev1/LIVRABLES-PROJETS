// Fonction pour extraire l'orderId de l'URL
function getOrderIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("orderId"); // Récupère la valeur de "orderId"
}

document.addEventListener("DOMContentLoaded", () => {
const orderId = getOrderIdFromUrl();
console.log(orderId);
if (orderId) {
    const orderIdField = document.querySelector("#orderId");
    orderIdField.innerText = orderId;
    console.log("Order ID récupéré :", orderId);
}
});

//console.log("Order ID récupéré :", orderId);

/*
const orderId = localStorage.getItem("orderId"); // Récupérer l'orderId stocké
if (orderId) {
    const orderIdField = document.querySelector("#orderId");
    orderIdField.innerText = ` ${orderId}`; // Afficher l'orderId
//const orderIdField = document.querySelector("#orderId");
//orderIdField.innerText= ` ${orderId}`;
//orderIdField.innerText = orderId;
console.log("Order ID récupéré :", orderId);
}
*/