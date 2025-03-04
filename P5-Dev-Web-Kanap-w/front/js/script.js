async function ListProduits(){
    const reponse = await fetch("http://localhost:3000/api/products");
    const produits = await reponse.json();
    console.log(produits);


    for (let i = 0; i < produits.length; i++) {


        const article = produits[i];
        // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiches = document.querySelector(".items");
         // Création d’une balise a
        const lien=document.createElement("a");
        lien.href="./product.html?id="+article._id;
        //console.log(lien.href);
        // Création d’une balise dédiée à un produit
        const singleProduct = document.createElement("article");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = article.imageUrl;
        imageElement.alt = article.altTxt;
        const nomElement = document.createElement("h3");
        nomElement.innerText = article.name;
        nomElement.className = "productName";
        const prixElement = document.createElement("p");
        prixElement.innerText=article.description;
        prixElement.className="productDescription";

        /*prixElement.innerText = `Prix: ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;*/
    
          // On rattache la balise a la section Fiches
          sectionFiches.appendChild(lien);

        // On rattache la balise article au lien
        lien.appendChild(singleProduct);
        // On rattache l’image à singleProduct (la balise article)
    
        
        singleProduct.appendChild(imageElement);
        singleProduct.appendChild(nomElement);
        singleProduct.appendChild(prixElement);
        
        //Ecouter l'événement "Click" sur un article/produit
/*
        article.addEventListener("click",function(){
            console.log("VOUS AVEZ CLIQUé SUR L'ARTICLE")
        });


/*
        article.href=./product.html?id=42"
        */
        //const testSyntax_i = document.querySelector(".productName");
        //console.log(testSyntax_i);

    }

}

ListProduits();

       //Ecouter l'événement "Click" sur un article/produit
/*
       const sectionFiches = document.querySelector(".items");

       sectionFiches.addEventListener("click",function(){
        console.log("VOUS AVEZ CLIQUé SUR L'ARTICLE")
    });
*/     


