

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

export { fetchData };  // Exportation de la fonction

*/

/*
// Fonction de recupération des données présente dans le local storage pour les mettre en format json. 


export function getStorage() {
    const dataProductSelected = window.localStorage.getItem("panierCC");
    return dataProductSelected ? JSON.parse(dataProductSelected) : []; // Retourne un tableau vide si rien en mémoire
}

// Exposer les fonctions à l'objet global
window.fetchData = fetchData;
window.getStorage = getStorage;
*/