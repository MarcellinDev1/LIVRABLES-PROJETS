//console.log("product.js chargé !");

// Attendre que window.fetchData soit défini
/*
const checkFetchData = setInterval(() => {
    if (window.fetchData) {
        console.log("✅ window.fetchData est maintenant défini !");
        clearInterval(checkFetchData);
    } else {
        console.log("⏳ En attente de la définition de window.fetchData...");
    }
}, 100);
*/
/*
console.log("product.js chargé !");
console.log("window.fetchData dans product.js :", window.fetchData);

document.addEventListener("DOMContentLoaded", async function() {
    // Attendre que `fetchData` soit bien défini
    while (!window.fetchData) {
        console.log("En attente de la définition de window.fetchData...");
        await new Promise(resolve => setTimeout(resolve, 100)); // Attendre 100ms
    }

    console.log("window.fetchData est maintenant défini :", window.fetchData);

    window.afficheProductSelected = async function() {
        try {
            const url = new URL(window.location.href);
            const search_params = new URLSearchParams(url.search);
            
            if (search_params.has('id')) {
                const id = search_params.get('id');
                console.log("ID récupéré :", id);
                
                const productData = await window.fetchData("http://localhost:3000/api/products/" + id);
                console.log(productData);
                // Logique pour afficher le produit ici
            }
        } catch (error) {
            console.error("Erreur lors de la récupération des données du produit :", error);
        }
    };

    window.afficheProductSelected(); // Appel immédiat après chargement
});
*/

//Import de la fonction fetch data et utilisation pour récupérer dans la liste des produits le produit avec l'id souhaité
//afin d'y appliquer des action dans la page spécifique à ce produit.
//import { fetchData } from './functions.js';

//Import de la fonction getPanier afin de l'utiliser
//import { getStorage } from './functions.js';

//Fonction afficheProductSelected qui, pour un produit sélectionné permet de l'afficher, 
// de lui associer des caractériqtiaues (quantité souhaitée, couleur) et de le placer dans le panier

//console.log(id);
//const verif1 = article._id;
//console.log(verif1);
/*
console.log("test2");
console.log(window.fetchData);
document.addEventListener("DOMContentLoaded", function() {
    */
    
// Créer un objet URL avec l'URL courante
const url = new URL(window.location.href);

// Récupérer les paramètres de l'URL
const search_params = new URLSearchParams(url.search);

// Vérifier si l'ID est présent dans les paramètres
if (search_params.has('id')) {
    const id = search_params.get('id');  // Récupère la valeur de l'ID
    console.log("ID récupéré :", id); // Vérifiez que l'ID est correctement extrait
    console.log(id);
        
       /*
console.log("test2");
console.log(window.fetchData);
document.addEventListener("DOMContentLoaded", function() {
        window.afficheProductSelected = async function() {
            try {
                // Créer un objet URL avec l'URL courante
                const url = new URL(window.location.href);
                
                // Récupérer les paramètres de l'URL
                const search_params = new URLSearchParams(url.search);
                
                // Vérifier si l'ID est présent dans les paramètres
                if (search_params.has('id')) {
                    const id = search_params.get('id');  // Récupère la valeur de l'ID
                    console.log("ID récupéré :", id); // Vérifiez que l'ID est correctement extrait
                    
                    const productData = await window.fetchData("http://localhost:3000/api/products/" + id);
                    console.log(productData);
                    // Logique pour afficher le produit ici
                }
            } catch (error) {
                console.error("Erreur lors de la récupération des données du produit :", error);
            }
        }
    })
    */
/*
        window.afficheProductSelected = async function(id) {
            try {

                // Créer un objet URL avec l'URL courante
                const url = new URL(window.location.href);
                    
                // Récupérer les paramètres de l'URL
                const search_params = new URLSearchParams(url.search);
                
                // Vérifier si l'ID est présent dans les paramètres
                if (search_params.has('id')) {
                    const id = search_params.get('id');  // Récupère la valeur de l'ID
                    console.log("ID récupéré :", id); // Vérifiez que l'ID est correctement extrait
                    console.log(id);

                console.log(window.fetchData);
                const productData = await window.fetchData("http://localhost:3000/api/products/" + id);
                console.log(productData);
                console.log("test100");
                // Logique pour afficher le produit ici
            } catch (error) {
                console.error("Erreur lors de la récupération des données du produit :", error);
            }
         }
        }
*/
/*
        })
        */
        // Appel de la fonction pour afficher le produit avec cet ID
        //afficheProductSelected(id);
/*
    } else {
        console.error("Aucun ID trouvé dans l'URL.");
    }
    */
   /*
});
*/

/*
window.afficheProductSelected = async function(id) {
    try {
        const productData = await window.fetchData("http://localhost:3000/api/products/" + id);
        console.log(productData);
        // Logique pour afficher le produit ici
    } catch (error) {
        console.error("Erreur lors de la récupération des données du produit :", error);
    }
}
;
*/

//console.log(lien.href);

//document.addEventListener("DOMContentLoaded", function() {
/*
async function afficherProduit(id) {
    try {
        const productData = await window.fetchData("http://localhost:3000/api/products/" + id);
        console.log(productData);
        // Logique pour afficher le produit ici
    } catch (error) {
        console.error("Erreur lors de la récupération des données du produit :", error);
    }
}
*/

/**
 * Fonction qui Récupère des données depuis une URL donnée en utilisant `fetch` et les met en format json.
 *
 * @async
 * @function fetchData
 * @param {string} url - L'URL de l'API ou de la ressource à récupérer.
 * @returns {Promise<Object>} Une promesse résolue avec les données JSON (Objet Json) récupérées.
 * @throws {Error} Si la requête échoue ou si le réseau renvoie une réponse invalide.
 */
async function fetchDataProduct(url) {
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

/** 
 * Fonction qui récupére les données du local storage et les retourne en résultat. Si le local storage est vide, la 
 * fonction retourne un tableau vide
 *
 * @function getStorageProduct
 * @returns {Array} Un tableau contenant les produits du panier, ou un tableau vide si aucun panier n'est stocké.
 */
function getStorageProduct() {
    const dataProductSelected = window.localStorage.getItem("panierCC");
    return dataProductSelected ? JSON.parse(dataProductSelected) : []; // Retourne un tableau vide si rien en mémoire
}


/**
 * Affiche les détails du produit sélectionné sur la page produit.
 *
 * @async
 * @function afficheProductSelected
 * @param {string} id - L'identifiant unique du produit à afficher.
 * @returns {Promise<void>} Ne retourne rien mais met à jour le DOM avec les informations du produit.
 * @throws {Error} Affiche une erreur en console si la récupération des données échoue.
 */
// Fonction d'affichage des données souhaitées du produit sélectionné 
async function afficheProductSelected(id){
    try {
        const productSelected = await fetchDataProduct("http://localhost:3000/api/products/" + id);    
        console.log(productSelected);

    // Récupération de l'élément du DOM qui accueillera les fiches 
    const sectionArticleSelected = document.querySelector(".item");

    // Création des balises     
    const imageElementSelected = document.createElement("img");

    imageElementSelected.src = productSelected.imageUrl;

    imageElementSelected.alt = productSelected.altTxt;

    const divImg = document.querySelector(".item__img");

    divImg.appendChild(imageElementSelected);

    const titleSelected = document.querySelector("#title");

    titleSelected.innerText = productSelected.name;

    const priceSelected = document.querySelector("#price");

    priceSelected.innerText = productSelected.price;

    const descriptionSelected = document.querySelector("#description");
    descriptionSelected.innerText = productSelected.description;

    const coloursSelected = document.querySelector("#colors");

    for (let i = 0; i < productSelected.colors.length; i++) {

        const optionSelected = document.createElement("option");
        optionSelected.value = productSelected.colors[i];
        optionSelected.innerText = productSelected.colors[i];
        coloursSelected.appendChild(optionSelected);
    }

    //Obliger l'utilisateur à ne saisir que des entiers supérieurs ou égaux à 1, ce qui exclut tout nombre
    //entier strictement inférieur à 1 et tout nombre décimal. Si la condition n'est pas respectée, alors 
    //la valur est forcée par défaut à 1.
    const QtyProductSelected = document.querySelector("#quantity");
    QtyProductSelected.addEventListener("input", (event) => {
    let value = Math.floor(event.target.value); // Arrondit toujours à l'entier inférieur
    if (isNaN(value) || value < 1) {
        event.target.value = 1;
    } else {
        event.target.value = value; // Force donc un nombre entier positif
    }
});

    //Initialisation "panier"
    let panier = [];



    //Actions qui se réalisent lorsque l'utilisateur clique sur le bouton "Ajouter au panier"
    const btnAjoutPanier = document.querySelector("#addToCart");
    btnAjoutPanier.addEventListener("click", function() {
        const idSelected = id;
        const quantitySelectedRaw = document.querySelector("#quantity").value;
        const quantitySelected = Number(quantitySelectedRaw);
        const colorSelected = document.getElementsByName("color-select")[0].value;

        if (quantitySelected <= 0 || colorSelected =="" ){
            btnAjoutPanier.setAttribute("disabled",true);
        } else {

        console.log(idSelected);
        console.log(quantitySelected);
        console.log(colorSelected);

        let infoProductSelected = { "idSel": idSelected, "qtySel": quantitySelected, "colorSel": colorSelected };

        console.log(infoProductSelected);


        const panierJSON = getStorageProduct();

            if (panierJSON === null) {
                panier = [infoProductSelected];
                window.localStorage.setItem("panierCC", JSON.stringify(panier));
                console.log("cas1");

            } else {
                console.log(panierJSON);
                panier = [];
                let productExist = false;

                for (let i = 0; i < panierJSON.length; i++) {
                    console.log(panierJSON[i].colorSel + "-" + infoProductSelected.colorSel);
                    if ((panierJSON[i].colorSel === infoProductSelected.colorSel) && (panierJSON[i].idSel===infoProductSelected.idSel)) {
                        console.log();
                        let qty = parseInt(panierJSON[i].qtySel) + parseInt(infoProductSelected.qtySel);
                        panierJSON[i].qtySel = qty.toString();
                        console.log(panierJSON[i].qtySel);
                        console.log("cas2");
                        panier = panierJSON;
                        productExist = true;
                    }
                }

                if (!productExist) {
                    panierJSON.push(infoProductSelected);
                    console.log("cas3");
                    panier = panierJSON;
                }

                window.localStorage.setItem("panierCC", JSON.stringify(panier));

                console.log(panier);
            }
        }
    });

    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
    }
    
};


//++
/*
const url = new URL(window.location.href);

const search_params = new URLSearchParams(url.search);

if (search_params.has('id')) {

    const id = search_params.get('id');

    console.log(id)
*/

afficheProductSelected(id);

/*
}
*/

}

/*
} )  
*/
