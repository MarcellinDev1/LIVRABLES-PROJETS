//console.log(lien.href);
async function afficheProductSelected(id) {

    const reponsebrute = await fetch("http://localhost:3000/api/products/" + id);

    const productSelected = await reponsebrute.json();

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

    /*let panier = [];*/

    const btnAjoutPanier = document.querySelector("#addToCart");
    btnAjoutPanier.addEventListener("click", function() {
        const idSelected = id;
        const quantitySelectedRaw = document.querySelector("#quantity").value;
        const quantitySelected = Number(quantitySelectedRaw);
        const colorSelected = document.getElementsByName("color-select")[0].value;
        /*const colorSelected=document.getElementsByTagName("select")[0].value;*/

        console.log(idSelected);
        console.log(quantitySelected);
        console.log(colorSelected);

        let infoProductSelected = { "idSel": idSelected, "qtySel": quantitySelected, "colorSel": colorSelected };
        /*const infoProductSelectedCC = JSON.stringify(infoProductSelected);*/

        console.log(infoProductSelected);
        const dataProductSelected = window.localStorage.getItem("panierCC");
        const panierJSON = JSON.parse(dataProductSelected);

        if (panierJSON === null) {
            panier = [infoProductSelected];
            window.localStorage.setItem("panierCC", JSON.stringify(panier));
            console.log("cas1");

        } else {
            console.log(panierJSON);
            panier = [];
            let productExist = false;

            for (i = 0; i < panierJSON.length; i++) {
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

            console.log(panier)
        }
    });

};

const url = new URL(window.location.href);

const search_params = new URLSearchParams(url.search);

if (search_params.has('id')) {

    const id = search_params.get('id');

    console.log(id)

afficheProductSelected(id);

}




    

