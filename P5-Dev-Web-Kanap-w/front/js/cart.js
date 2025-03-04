async function afficheCart() {

const dataLocalStorage = localStorage.getItem("panierCC");
const dataLocalStorageJSON = JSON.parse(dataLocalStorage);

let Totalqty=0;
let TotalPrice=0;

//Ne pas oublier de traiter le cas local storage vidé puis page panier rafraichie car msg d'error ds ce cas
for (let i = 0; i < dataLocalStorageJSON.length; i++) {
  
const id_i=dataLocalStorageJSON[i].idSel;
const colourStored_i=dataLocalStorageJSON[i].colorSel;
let qtyStored_i=dataLocalStorageJSON[i].qtySel;

const reponsebrute_i= await fetch("http://localhost:3000/api/products/" + id_i);
console.log(reponsebrute_i);
const productSelected_i = await reponsebrute_i.json();

console.log(productSelected_i);
 // Création des balises 
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
            const cardProductQtyInput_i=document.createElement("input");
              cardProductQtyInput_i.setAttribute("type", "number");
              cardProductQtyInput_i.setAttribute("class", "itemQuantity");
              cardProductQtyInput_i.setAttribute("name", "itemQuantity");
              cardProductQtyInput_i.setAttribute("min", "1");
              cardProductQtyInput_i.setAttribute("max", "100");
              cardProductQtyInput_i.setAttribute("value", qtyStored_i);

              //Obliger l'utilisateur à ne saisir que des entiers supérieurs ou égaux à 1, ce qui exclut tout nombre
              //entier strictement inférieur à 1 et tout nombre décimal. Si la condition n'est pas respectée, alors la valur est forcée par défaut à 1.
              cardProductQtyInput_i.addEventListener("input", (event) => {
                let value = Math.floor(event.target.value); // Arrondit toujours à l'entier inférieur
                if (isNaN(value) || value < 1) {
                    event.target.value = 1;
                } else {
                    event.target.value = value; // Force un nombre entier positif
                }
            });

//var qtyEntered_i;
window.localStorage.setItem("panierCC", JSON.stringify(dataLocalStorageJSON));


const divCartItemContentSettingsDelete_i = document.createElement("div");
divCartItemContentSettingsDelete_i.setAttribute("class", "cart__item__content__settings__delete");
    const cardProductDeleteLabel_i=document.createElement("p");
      cardProductDeleteLabel_i.setAttribute("class", "deleteItem");
      cardProductDeleteLabel_i.innerText="Supprimer";      


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
/*

if (cardProductQtyInput_i.value = dataLocalStorageJSON[i].qtySel ) { 
console.log("msg1")
}
else {
  console.log("msg1");
}
*/
let areatotalqty = document.querySelector("#totalQuantity");
areatotalqty.innerText=Totalqty;

let areatotalPrice = document.querySelector("#totalPrice");
areatotalPrice.innerText=TotalPrice;

//FUNCTION ON CHANGE

cardProductQtyInput_i.addEventListener('change', function(){
  check1 = 2;
  console.log(check1);
  cardProductQtyInput_i.value=this.value;
  
  previousQtyLocalStorageValue_i=dataLocalStorageJSON[i].qtySel;
  //console.log(previousLocalStorageValue_i);

  dataLocalStorageJSON[i].qtySel=parseInt(cardProductQtyInput_i.value);

  console.log(previousQtyLocalStorageValue_i);
  console.log(dataLocalStorageJSON[i].qtySel);

 window.localStorage.setItem("panierCC", JSON.stringify(dataLocalStorageJSON));

 console.log(JSON.stringify(dataLocalStorageJSON));
 
 //stockageLocal = dataLocalStorageJSON;
 
 console.log(Totalqty);

  qtyEntered_i=dataLocalStorageJSON[i].qtySel;
  console.log(qtyEntered_i);

  Totalqty=parseInt(Totalqty)-parseInt(previousQtyLocalStorageValue_i)+parseInt(qtyEntered_i);
  console.log(Totalqty);
  TotalPrice=TotalPrice-(productSelected_i.price*previousQtyLocalStorageValue_i)+(productSelected_i.price*qtyEntered_i);
  console.log(TotalPrice);

  areatotalqty = document.querySelector("#totalQuantity");
  areatotalqty.innerText=Totalqty;

  areatotalPrice = document.querySelector("#totalPrice");
  areatotalPrice.innerText=TotalPrice;

})
  
//END FUNCTION ON CHANGE

//const dataStorageCopyFiltered =

//FUNCTION ON CLICK POUR LA SUPPRESSION

//divCartItemContentSettingsDelete_i.addEventListener('click', function(){
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

//END FUNCTION ON CLICK POUR LA SUPPRESSION



//window.localStorage.setItem("panierCC", JSON.stringify(dataStorageCopyFiltered));
console.log(Totalqty);

qtyEntered_i=dataLocalStorageJSON[i].qtySel;
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

////////////////////

console.log(check1);

 
}

}

afficheCart();

/*
let chaine = 'Bonjour, je m\'appelle Pierre et Vous ?';
let masque1 = /Pierre/;*/

/*Intervalle ou "classe" de caractères permettant de trouver n'importe quelle
 *lettre majuscule de l'alphabet classique (sans les accents ou cédille)*/
/*
let masque2 = /[A-Z]/;
let masque3 = /[A-Z]/g; //Ajout d'une option ou drapeau "global" */

//Recherche "Pierre" dans let chaine et renvoie la première correspondance
/*
let testPierre = 'Trouvé : ' + chaine.match(masque1);
console.log(testPierre);
let testMajuscule = 'Trouvé : ' + chaine.match(masque2);
console.log(testMajuscule);
let testMajusculeGlobal = 'Trouvé : ' + chaine.match(masque3);
console.log(testMajusculeGlobal);

let chaine2 = 'Bonjour, je m\'appelle Pierre et vous ?';
let masque1bis = /[ ,']/;
let masque2bis = /e/;
let masque3bis = /ou/g;
let sousChaine = chaine2.split(masque1bis);
console.log(sousChaine);*/



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
/*
let masquetest20 = /\\d/;
let test5=" 256";
let resultat = masquetest20.test(test5);
console.log(resultat);*/


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

/*
let contact = { "firstName": document.event.target.querySelector("#firstName").value, "lastName": document.event.target.querySelector("#lastName").value, "address": document.event.target.querySelector("#address").value, "city": document.event.target.querySelector("#city").value, "email": document.event.target.querySelector("#email").value, };
//const contactsDataJSON = JSON.stringify(contactsData);

const dataLocalocalStorageCurrent = localStorage.getItem("panierCC");
const dataLocalStorageCurrentJSON = JSON.parse(dataLocalocalStorageCurrent );

let products=Array();
for (let i = 0; i < dataLocalStorageCurrentJSON.length; i++) {
  products.push(dataLocalStorageCurrentJSON[i].idSel);
}

let tableauPanier =[contact,products];
const tableauPanierJSON = JSON.stringify(tableauPanier);
console.log(tableauPanierJSON);
*/

//let products=localStorage.getItem("panierCC").[1];

//console.log(products.length);
//let boutonSubmit = document.querySelector("#order");
//let boutonSubmit = document.getElementById("order");
//const boutonSubmit = document.querySelector(".cart__order__form");
const boutonSubmit = document.querySelector(".cart__order");

boutonSubmit.addEventListener("submit", function(event){
    event.preventDefault();
    // Appel de la fonction fetch avec toutes les informations nécessaires
    //if (msgErreurPrenom.innerText ="" and msgErreurNom.innerText ="" and ) etc

    //console.log(products.length);
    //let contact = { "firstName": document.event.target.querySelector("#firstName").value, "lastName": document.event.target.querySelector("#lastName").value, "address": document.event.target.querySelector("#address").value, "city": document.event.target.querySelector("#city").value, "email": document.event.target.querySelector("#email").value, };
    //const contact = { "firstName": event.target.querySelector("#firstName").value, "lastName": event.target.querySelector("#lastName").value, "address": event.target.querySelector("#address").value, "city": event.target.querySelector("#city").value, "email": event.target.querySelector("#email").value, };

    const dataLocalocalStorageCurrent = localStorage.getItem("panierCC");
    const dataLocalStorageCurrentJSON = JSON.parse(dataLocalocalStorageCurrent );
    console.log(dataLocalStorageCurrentJSON);

   //const products=Array();
    const products=[];
    for (let i = 0; i < dataLocalStorageCurrentJSON.length; i++) {
      products.push(dataLocalStorageCurrentJSON[i].idSel);
    }

    //const tableauPanier = {"firstName": event.target.querySelector("#firstName").value, "lastName": event.target.querySelector("#lastName").value, "address": event.target.querySelector("#address").value, "city": event.target.querySelector("#city").value, "email": event.target.querySelector("#email").value, products};
    const contact = {"firstName": event.target.querySelector("#firstName").value, "lastName": event.target.querySelector("#lastName").value, "address": event.target.querySelector("#address").value, "city": event.target.querySelector("#city").value, "email": event.target.querySelector("#email").value};
    //const contactsDataJSON = JSON.stringify(contactsData);
    
    
    //let tableauPanier ={contact.firstName, contact.lirstName, contact.address, contact.city, contact.email, products};
    const tableauPanier ={contact, products};
    const orderData = JSON.stringify(tableauPanier);
    console.log(orderData);

    console.log("Données envoyées :", tableauPanier);
    console.log("JSON envoyé :", orderData);
    
    /*
        if (products.length>0){
            fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: orderData,
          })
          .then(response => {
          if (response.ok) { // if HTTP-status is 200-299
            // obtenir le corps de réponse (la méthode expliquée ci-dessous)
            //async let json = await response.json();
            let json = response.json();
          } else {
            alert("HTTP-Error: " + response.status);
          }
        })
        */


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

        //localStorage.setItem("orderId", orderId);

        //window.location.href = "confirmation.html"; // Redirection après succès

        window.location.href = `confirmation.html?orderId=${orderId}`; // Redirection après succès
       

      })
      .catch(error => console.error("Erreur API :", error));

/*
        .then(response => {
        if (response.ok) { // if HTTP-status is 200-299
          // obtenir le corps de réponse (la méthode expliquée ci-dessous)
          //async let json = await response.json();
          let json = response.json();
        } else {
          alert("HTTP-Error: " + response.status);
        }
      })
      */

/*
console.log("Données envoyées :", tableauPanierJSON);
console.log("Type de données envoyées :", typeof tableauPanierJSON);
*/

/*
fetch("http://localhost:3000/api/products/order", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: orderData
})
.then(response => {
    console.log("Statut HTTP :", response.status);
    return response.json();
})
.then(data => console.log("Réponse API :", data))
.catch(error => console.error("Erreur API :", error));

*/

/*
        fetch("http://localhost:3000/api/products/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            firstName: "ggg",
            lastName: "gggg",
            address: "1 fff 55555 ggg",
            city: "jkjjjj",
            email: "hhhh@gggg.fr",
            products: ["415b7cacb65d43b2b5c1ff70f3393ad1", "034707184e8e4eefb46400b5a3774b5f"]
          })
        })
        .then(response => response.json())
        .then(data => console.log("Réponse API :", data))
        .catch(error => console.error("Erreur :", error));
*/

          /*
          .then(response => {
            if (!response.ok) {
              throw new Error("Network response was not ok " + response.statusText);
            }
            return response.json();
          })
          .then(data => console.log(data))
          .catch(error => console.error("Error:", error)); */

         /* let reponse = posting.json();
          console.log(reponse);*/

          //.then(posting.json());
          //.then(function(res){ console.log(res) })
          //.then(function(res){ console.log("res "+res) })
          //.catch(function(res){ console.log(res) })
          //console.log(res)

          
        }


})

/*
console.log(infoProductSelected);
const dataProductSelected = window.localStorage.getItem("panierCC");
const panierJSON = JSON.parse(dataProductSelected);

!req.body.contact.firstName ||
!req.body.contact.lastName ||
!req.body.contact.address ||
!req.body.contact.city ||
!req.body.contact.email ||
*/