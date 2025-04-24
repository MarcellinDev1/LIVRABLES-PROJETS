//Import de la fonction getPanier afin de l'utiliser
//import { getStorage } from './functions.js';

//Import de la fonction fetch data et utilisation pour récupérer dans la liste des produits le produit avec l'id souhaité
//afin de l'exploiter
//import { fetchData } from './functions.js';



/** 
 * Fonction qui récupére les données du local storage et les retourne en résultat. Si le local storage est vide, la 
 * fonction retourne un tableau vide
 *
 * @function getStorageCart
 * @returns {Array} Un tableau contenant les produits du panier, ou un tableau vide si aucun panier n'est stocké.
 */
function getStorageCart() {
  const dataProductSelected = window.localStorage.getItem("panierCC");
  return dataProductSelected ? JSON.parse(dataProductSelected) : []; // Retourne un tableau vide si rien en mémoire
}

// Fonction de recupération des données présente sur un url pour les mettre en format json. 
async function fetchDataCart(url) {
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
 * Fonction qui Affiche le contenu du panier en récupérant les données depuis le localStorage 
 * et les informations des produits via l'API. Met à jour dynamiquement les quantités et les prix.
 *
 * @async
 * @function afficheCart
 * @returns {Promise<void>} Ne retourne rien, mais met à jour le DOM avec les éléments du panier.
 * @throws {Error} Si la récupération des produits ou la manipulation du DOM échoue.
 */
async function afficheCart() {
    const dataLocalStorageJSON =getStorageCart();
    console.log(dataLocalStorageJSON);

    let Totalqty=0;
    let TotalPrice=0;

    //Ne pas oublier de traiter le cas local storage vidé puis page panier rafraichie car msg d'error ds ce cas
    // Vérifie si le panier est vide
    /*
    if (!dataLocalStorageJSON || dataLocalStorageJSON.length === 0) {
      console.warn("Le panier est vide.");
      return;
    }
    */

    // Parcours des éléments du panier
    for (let i = 0; i < dataLocalStorageJSON.length; i++) {
      
    const id_i=dataLocalStorageJSON[i].idSel;
    const colourStored_i=dataLocalStorageJSON[i].colorSel;
    let qtyStored_i=dataLocalStorageJSON[i].qtySel;

    // Récupération des informations du produit via l'API
    const productSelected_i= await fetchDataCart("http://localhost:3000/api/products/" + id_i);
    console.log(productSelected_i);
    console.log(productSelected_i);

    // Création des balises (Création des éléments HTML pour afficher les produits dans le panier)
    const articlePanierElement_i = document.createElement("article");
    articlePanierElement_i.setAttribute("class", "cart__item");
    articlePanierElement_i.setAttribute("data-id", id_i);
    articlePanierElement_i.setAttribute("data-color", colourStored_i);

    const divImage_i = document.createElement("div");
    divImage_i.setAttribute("class", "cart__item__img");

    const imagePanierElement_i = document.createElement("img");
    imagePanierElement_i.src = productSelected_i.imageUrl;
    imagePanierElement_i.alt = productSelected_i.altTxt;

    const divCartItemContent_i = document.createElement("div");
    divCartItemContent_i.setAttribute("class", "cart__item__content");

        const divCartItemContentDesc_i = document.createElement("div");
        divCartItemContentDesc_i.setAttribute("class", "cart__item__content__description");

            const cardProductName_i=document.createElement("h2");
            cardProductName_i.innerText=productSelected_i.name;
            const cardProductColor_i=document.createElement("p");
            cardProductColor_i.innerText=colourStored_i;
            const cardProductPrice_i=document.createElement("p");
            cardProductPrice_i.innerText=productSelected_i.price;

        const divCartItemContentSettings_i = document.createElement("div");
        divCartItemContentSettings_i.setAttribute("class", "cart__item__content__settings");

            const divCartItemContentSettings_qty_i = document.createElement("div");
            divCartItemContentSettings_qty_i.setAttribute("class", "cart__item__content__settings__quantity");

                const cardProductqtyLabel_i=document.createElement("p");
                cardProductqtyLabel_i.innerText="Qté :";
                  // Gestion de la quantité
                const cardProductQtyInput_i=document.createElement("input");
                  cardProductQtyInput_i.setAttribute("type", "number");
                  cardProductQtyInput_i.setAttribute("class", "itemQuantity");
                  cardProductQtyInput_i.setAttribute("name", "itemQuantity");
                  cardProductQtyInput_i.setAttribute("min", "1");
                  cardProductQtyInput_i.setAttribute("max", "100");
                  cardProductQtyInput_i.setAttribute("value", qtyStored_i);

                  //Obliger l'utilisateur à ne saisir que des entiers supérieurs ou égaux à 1, ce qui exclut tout nombre
                  //entier strictement inférieur à 1 et tout nombre décimal. Si la condition n'est pas respectée, alors 
                  //la valur est forcée par défaut à 1.
                  cardProductQtyInput_i.addEventListener("input", (event) => {
                    let value = Math.floor(event.target.value); // Arrondit toujours à l'entier inférieur
                    if (isNaN(value) || value < 1) {
                        event.target.value = 1;
                    } else {
                        event.target.value = value; // Force donc un nombre entier positif
                    }
                });

    // Mise à jour du localStorage après modification de la quantité
    window.localStorage.setItem("panierCC", JSON.stringify(dataLocalStorageJSON));

    // Boutton pour suppression d'un article du panier
    const divCartItemContentSettingsDelete_i = document.createElement("div");
    divCartItemContentSettingsDelete_i.setAttribute("class", "cart__item__content__settings__delete");
        const cardProductDeleteLabel_i=document.createElement("p");
          cardProductDeleteLabel_i.setAttribute("class", "deleteItem");
          cardProductDeleteLabel_i.innerText="Supprimer";      

    //Alimentation de données dans le DOM
    const section_i = document.querySelector("#cart__items");
    section_i.appendChild(articlePanierElement_i);
        articlePanierElement_i.appendChild(divImage_i);
            divImage_i.appendChild(imagePanierElement_i);
        articlePanierElement_i.appendChild(divCartItemContent_i);
            divCartItemContent_i.appendChild(divCartItemContentDesc_i);
                divCartItemContentDesc_i.appendChild(cardProductName_i);
                divCartItemContentDesc_i.appendChild(cardProductColor_i);
                divCartItemContentDesc_i.appendChild(cardProductPrice_i);
                
            divCartItemContent_i.appendChild(divCartItemContentSettings_i);
                divCartItemContentSettings_i.appendChild(divCartItemContentSettings_qty_i );
                  divCartItemContentSettings_qty_i.appendChild(cardProductqtyLabel_i);
                  divCartItemContentSettings_qty_i.appendChild(cardProductQtyInput_i);

            divCartItemContent_i.appendChild(divCartItemContentSettingsDelete_i);
                divCartItemContentSettingsDelete_i.appendChild(cardProductDeleteLabel_i );

    let previousQtyLocalStorageValue_i=dataLocalStorageJSON[i].qtySel;

    let check1 = 1;
    let areatotalqty = document.querySelector("#totalQuantity");
    areatotalqty.innerText=Totalqty;

    let areatotalPrice = document.querySelector("#totalPrice");
    areatotalPrice.innerText=TotalPrice;

    //DEBUT DE LA FONCTION ON CHANGE
    cardProductQtyInput_i.addEventListener('change', function(){
      check1 = 2;
      console.log(check1);
      cardProductQtyInput_i.value=this.value;
      
      previousQtyLocalStorageValue_i=dataLocalStorageJSON[i].qtySel;

      dataLocalStorageJSON[i].qtySel=parseInt(cardProductQtyInput_i.value);

      console.log(previousQtyLocalStorageValue_i);
      console.log(dataLocalStorageJSON[i].qtySel);

    window.localStorage.setItem("panierCC", JSON.stringify(dataLocalStorageJSON));

    console.log(JSON.stringify(dataLocalStorageJSON));
    
    console.log(Totalqty);

      const qtyEntered_i=dataLocalStorageJSON[i].qtySel;
      console.log(qtyEntered_i);

      // Calcul des totaux
      Totalqty=parseInt(Totalqty)-parseInt(previousQtyLocalStorageValue_i)+parseInt(qtyEntered_i);
      console.log(Totalqty);
      TotalPrice=TotalPrice-(productSelected_i.price*previousQtyLocalStorageValue_i)+(productSelected_i.price*qtyEntered_i);
      console.log(TotalPrice);

      areatotalqty = document.querySelector("#totalQuantity");
      areatotalqty.innerText=Totalqty;

      areatotalPrice = document.querySelector("#totalPrice");
      areatotalPrice.innerText=TotalPrice;

    })      
    //FIN DE LA FONCTION ON CHANGE


    //DEBUT DE LA FONCTION ON CLICK POUR LA SUPPRESSION
    cardProductDeleteLabel_i.addEventListener('click', function(){
      const articleToDelete = divCartItemContentSettingsDelete_i.closest("article");
      //const qtyZoneInputToDelete = divCartItemContentSettingsDelete_i.closest("input");
      //articleToDelete.setAttribute("class", "classArticleToDelete");
      //articleToDelete.classList.add("classArticleToDelete");
      const idToDelete = articleToDelete.getAttribute("data-id");
      const colorToDelete = articleToDelete.getAttribute("data-color");

      console.log(idToDelete);
      console.log(colorToDelete);

      let previousareatotalqtyValue = parseInt(areatotalqty.innerText);
      let previousareatotalPriceValue = parseInt(areatotalPrice.innerText);
      console.log(previousareatotalqtyValue);
      console.log(previousareatotalPriceValue);

      let articlePrice_i=productSelected_i.price;
      console.log(articlePrice_i);

      let qtyToDelete  =cardProductQtyInput_i.value;
      
      console.log(qtyToDelete);

      let newareatotalqtyValue = parseInt(previousareatotalqtyValue) - parseInt(qtyToDelete);
      let newareatotalPriceValue = parseInt(previousareatotalPriceValue) - parseInt(qtyToDelete)*parseInt(articlePrice_i);
      console.log(newareatotalqtyValue);
      console.log(newareatotalPriceValue);
    
      areatotalqty = document.querySelector("#totalQuantity");
      areatotalqty.innerText=newareatotalqtyValue;

      areatotalPrice = document.querySelector("#totalPrice");
      areatotalPrice.innerText=newareatotalPriceValue;

      const dataStorageCopy = Array.from(dataLocalStorageJSON);
      console.log(dataLocalStorageJSON);
      console.log(dataStorageCopy);

        const dataStorageCopyFiltered = dataStorageCopy.filter(function(z){
          return ((z.idSel != idToDelete) || (z.colorSel != colorToDelete));
      })
          console.log(dataStorageCopyFiltered);
      
      
      console.log(idToDelete);

      window.localStorage.setItem("panierCC", JSON.stringify(dataStorageCopyFiltered));

      articleToDelete.remove();
    })
    //FIN DE LA FONCTION ON CLICK POUR LA SUPPRESSION

    console.log(Totalqty);

    const qtyEntered_i=dataLocalStorageJSON[i].qtySel;
    console.log(qtyEntered_i);

    qtyStored_i=dataLocalStorageJSON[i].qtySel;
    console.log(qtyStored_i);

    Totalqty=parseInt(Totalqty)+parseInt(qtyStored_i);
    console.log(Totalqty);
    TotalPrice=TotalPrice+(productSelected_i.price*qtyStored_i);
    console.log(TotalPrice);


    areatotalqty = document.querySelector("#totalQuantity");
    areatotalqty.innerText=Totalqty;

    areatotalPrice = document.querySelector("#totalPrice");
    areatotalPrice.innerText=TotalPrice;

    console.log(check1);    
    }
    }

afficheCart();

//REGLES DE VERIFICATION DES DONNEES SAISIES PAR L'UTILISATEUR DANS LE FORMULAIRE

// Fonction de validation générique
function validerChamp(inputSelector, errorSelector, regex, messageErreur) {
  let inputField = document.querySelector(inputSelector);
  let msgErreur = document.querySelector(errorSelector);

  inputField.addEventListener('change', function () {
      let valeur = inputField.value.trim();
      let estValide = regex.test(valeur);

      msgErreur.innerText = estValide ? "" : messageErreur;
  });
}

// Définition des regex
const masqueAlpha = /^[a-zA-ZÀ-ÿ\s'-]+$/; // Autorise accents, espaces et apostrophes et tirets
const masqueAdress = /^(\d{1,5})\s([a-zA-ZÀ-ÿ\s'-,]+)\s(\d{5})\s([a-zA-ZÀ-ÿ\s'-]+)$/;
const masqueEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Appel de la fonction pour chaque champ
validerChamp("#firstName", "#firstNameErrorMsg", masqueAlpha, "Veuillez saisir un prénom valide.");
validerChamp("#lastName", "#lastNameErrorMsg", masqueAlpha, "Veuillez saisir un nom valide.");
validerChamp("#address", "#addressErrorMsg", masqueAdress, "Veuillez saisir une adresse valide.");
validerChamp("#city", "#cityErrorMsg", masqueAlpha, "Veuillez saisir une ville valide.");
validerChamp("#email", "#emailErrorMsg", masqueEmail, "Veuillez saisir un email valide.");





/*
let prenomField = document.querySelector("#firstName");
let masqueAlpha = /[a-zA-Z]+/;

prenomField.addEventListener('change', function(){
let prenomFieldValue = document.querySelector("#firstName").value;
 let ValidPrenom = masqueAlpha.test(prenomFieldValue);
 let msgErreurPrenom= document.getElementById("firstNameErrorMsg"); 
    if(ValidPrenom==false){          
      msgErreurPrenom.innerText =" Veuiller saisir le prénom au format alphanumérique";
    }  
    else
    msgErreurPrenom.innerText ="";
})


let nomField = document.querySelector("#lastName");
nomField.addEventListener('change', function(){
let nomFieldValue = document.querySelector("#lastName").value;
 let ValidNom = masqueAlpha.test(nomFieldValue);
 let msgErreurNom= document.getElementById("lastNameErrorMsg");
    if(ValidNom==false){           
      msgErreurNom.innerText =" Veuiller saisir le nom au format alphanumérique";    
    } 
    else
    msgErreurNom.innerText =""; 
})

let AdressField = document.querySelector("#address");
let masqueAdress = /^(\d{1,5})\s([a-zA-ZÀ-ſ\s'-,]+)\s(\d{5})\s([a-zA-ZÀ-ſ\s'-]+)$/;

AdressField.addEventListener('change', function(){
let AdressFieldValue = document.querySelector("#address").value;
 let ValidAdress = masqueAdress.test(AdressFieldValue);
 let msgErreurAdress= document.getElementById("addressErrorMsg"); 
    if(ValidAdress==false){         
      msgErreurAdress.innerText =" Veuiller saisir un format d'adresse française valide";    
    } 
    else
    msgErreurAdress.innerText ="";
})

let villeField = document.querySelector("#city");
villeField.addEventListener('change', function(){
  let villeFieldValue = document.querySelector("#city").value;
   let ValidVille = masqueAlpha.test(villeFieldValue);
   let msgErreurVille= document.getElementById("cityErrorMsg");
      if(ValidVille==false){           
        msgErreurVille.innerText =" Veuiller saisir la ville au format alphanumérique";    
      } 
      else
      msgErreurVille.innerText =""; 
  })

let emailField = document.querySelector("#email");
let masqueEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

emailField.addEventListener('change', function(){
let emailFieldValue = document.querySelector("#email").value;
 let ValidEmail = masqueEmail.test(emailFieldValue);
 let msgErreurEmail= document.getElementById("emailErrorMsg"); 
    if(ValidEmail==false){         
      msgErreurEmail.innerText =" Veuiller saisir un format d'email correct";    
    } 
    else
    msgErreurEmail.innerText ="";
})
*/

const boutonSubmit = document.querySelector(".cart__order");

//INSTRUCTIONS A EXECUTER LORSQUE L'UTILISATEUR CLIQUE SUR LE BOUTTON "COMMANDER"

boutonSubmit.addEventListener("submit", function(event){
    event.preventDefault();

    const dataLocalocalStorageCurrent = localStorage.getItem("panierCC");
    const dataLocalStorageCurrentJSON = JSON.parse(dataLocalocalStorageCurrent );
    console.log(dataLocalStorageCurrentJSON);

    const firstNameError = document.getElementById("firstNameErrorMsg").textContent.trim();
    const lastNameError = document.getElementById("lastNameErrorMsg").textContent.trim();
    const addressError = document.getElementById("addressErrorMsg").textContent.trim();
    const cityError = document.getElementById("cityErrorMsg").textContent.trim();
    const emailError = document.getElementById("emailErrorMsg").textContent.trim();

    if (!Array.isArray(dataLocalStorageCurrentJSON) || 
    dataLocalStorageCurrentJSON.length===0 ||  
    firstNameError !== "" ||
    lastNameError !== "" ||
    addressError !== "" ||
    cityError !== "" ||
    emailError !== ""
    ){ 
      boutonSubmit.setAttribute("disabled",true);    
    } else {

        const products=[];
        for (let i = 0; i < dataLocalStorageCurrentJSON.length; i++) {
          products.push(dataLocalStorageCurrentJSON[i].idSel);
        }
   
        const contact = {"firstName": event.target.querySelector("#firstName").value, "lastName": event.target.querySelector("#lastName").value, "address": event.target.querySelector("#address").value, "city": event.target.querySelector("#city").value, "email": event.target.querySelector("#email").value};
        
        const tableauPanier ={contact, products};
        const orderData = JSON.stringify(tableauPanier);
        console.log(orderData);

        console.log("Données envoyées :", tableauPanier);
        console.log("JSON envoyé :", orderData);
        
        //POUR OBTENIR L'ID DE CONFIRMATION
        if (products.length>0){
          fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: orderData,
        })
            .then(response => {
              console.log("Statut HTTP :", response.status);
              //response is ok if HTTP-status is 200-299
              return response.json();
            })
            .then(data => {
              console.log("Réponse API :", data);
              const orderId = data.orderId
              console.log(orderId);

            //Effacement des données du local storage
            localStorage.clear();

            window.location.href = `confirmation.html?orderId=${orderId}`; // Redirection après succès      
          
        })

          .catch(error => console.error("Erreur API :", error));
          
        }
    }

    
})

