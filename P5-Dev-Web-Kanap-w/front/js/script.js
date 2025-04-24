
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

