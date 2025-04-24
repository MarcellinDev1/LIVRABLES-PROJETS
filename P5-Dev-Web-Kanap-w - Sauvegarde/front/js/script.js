
// Fonction de recupération des données présente sur un url pour les mettre en format json. 
// Fonction importable via n'importe quel page js de mon projet.

/*
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de réseau : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
}

//export { fetchData };  // Exportation de la fonction


// Fonction de recupération des données présente dans le local storage pour les mettre en format json. 
//export 
function getStorage() {
    const dataProductSelected = window.localStorage.getItem("panierCC");
    return dataProductSelected ? JSON.parse(dataProductSelected) : []; // Retourne un tableau vide si rien en mémoire
}

// Exposer les fonctions à l'objet global
window.fetchData = fetchData;
window.getStorage = getStorage;

console.log(window.fetchData);
*/


/*
const MyApp = {
    fetchData: fetchData,
    getStorage: getStorage,
};

window.MyApp = MyApp;
*/

/*
console.log("script.js chargé !");

// Vérifions immédiatement si la fonction est bien attachée à window
window.fetchData = async function(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de réseau : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
};

// Vérification après définition
console.log("window.fetchData défini dans script.js :", window.fetchData);

/*
// Définir la fonction fetchData directement dans window
window.fetchData = async function(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de réseau : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
};
*/
/*
console.log("window.fetchData dans script.js :", window.fetchData);

// Définir la fonction getStorage directement dans window
window.getStorage = function() {
    const dataProductSelected = window.localStorage.getItem("panierCC");
    return dataProductSelected ? JSON.parse(dataProductSelected) : []; // Retourne un tableau vide si rien en mémoire
};

console.log(window.fetchData);  // Vérifier que la fonction est bien attachée à window
console.log(window.getStorage);  // Vérifier que la fonction est bien attachée à window

*/


//Import de la fonction fetch data et utilisation pour récupérer la liste des produits et les afficher
// dans l'onglet "Accueil".

//import { fetchData } from './functions.js';

//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyyyyyyyy
//yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy


/**
 * Fonction qui Récupère des données depuis une URL donnée en utilisant `fetch` et les met en format json.
 *
 * @async
 * @function fetchData
 * @param {string} url - L'URL de l'API ou de la ressource à récupérer.
 * @returns {Promise<Object>} Une promesse résolue avec les données JSON (Objet Json) récupérées.
 * @throws {Error} Si la requête échoue ou si le réseau renvoie une réponse invalide.
 */
async function fetchData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Erreur de réseau : ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        throw error;
    }
}

//export { fetchData };  // Exportation de la fonction

/**
 * Fonction qui récupère la liste des produits depuis l'API et les affiche sur la page.
 *
 * @async
 * @function ListProduits
 * @returns {Promise<void>} Ne retourne rien, mais met à jour le DOM avec les produits.
 * @throws {Error} Si la récupération des produits échoue.
 */
async function ListProduits() {
    try {
        const produits = await fetchData("http://localhost:3000/api/products");
        console.log(produits);
   
        for (let i = 0; i < produits.length; i++) {

        const article = produits[i];

        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".items");

         // Création d’une balise a (lien vers la page du produit)
        const lien=document.createElement("a");
        lien.href="./product.html?id="+article._id;

        // Création d’une balise dédiée à un produit
        const singleProduct = document.createElement("article");

        // Création des balises (Création et configuration des éléments (image, titre, description)
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.altTxt;

        const nomElement = document.createElement("h3");
        nomElement.innerText = article.name;
        nomElement.className = "productName";

        const prixElement = document.createElement("p");
        prixElement.innerText=article.description;
        prixElement.className="productDescription";
    
        // Ajout des éléments au DOM

            // On rattache la balise a la section Fiches
            sectionFiches.appendChild(lien);

            // On rattache la balise article au lien
            lien.appendChild(singleProduct);

            // On rattache l’image à singleProduct (la balise article)        
            singleProduct.appendChild(imageElement);

            singleProduct.appendChild(nomElement);
            singleProduct.appendChild(prixElement);
    }

    } catch (error) {
    console.error("Erreur lors de la récupération des produits :", error);
}

}

ListProduits();    

/*
setTimeout(() => {
    console.log("Vérification tardive de window.fetchData :", window.fetchData);
}, 1000);
*/
/*
document.addEventListener("DOMContentLoaded", function() {

ListProduits();
    
});
*/