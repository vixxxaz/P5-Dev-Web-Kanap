api = "http://localhost:3000/api/products/";
var str = window.location.href;
var url = new URL(str);
var idKanap = url.searchParams.get("id");

// mettre en place le local storage

let kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));

fetch("http://localhost:3000/api/products/")

.then(function(resapi) {
    if (resapi.ok) {
        return resapi.json();
    }

})

.then(function(data) {
        kanapDisplayCart(data);
    })
    .catch((error) => {
        alert("Erreur !");
    })

const forEmptyCart = document.querySelector("#cart__items");


function kanapDisplayCart(data) {

    if (!kanapLocalStorage) {
        //pour le panier vide
        let title = document.querySelector("h1");
        let votrePanier = document.querySelector(".cart");
        title.innerHTML = "votre panier est vide";
        votrePanier.style.display = "none";
    } else {
        for (let i = 0; i < kanapLocalStorage.length; i++) {

            let kanapArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(kanapArticle);
            kanapArticle.className = "cart__item";
            kanapArticle.setAttribute("data-id", kanapLocalStorage[i].Id);


            //div de l image

            let kanapDiv = document.createElement("div");
            kanapArticle.appendChild(kanapDiv);
            kanapDiv.className = "cart__item__img";

            //ajout de l'image
            let kanapDivImg = document.createElement("img");
            kanapDiv.appendChild(kanapDivImg);
            kanapDivImg.src = kanapLocalStorage[i].imgKanap;

            //ajout 2nd div 
            let kanapDivContent = document.createElement("div");
            kanapArticle.appendChild(kanapDivContent);
            kanapDivContent.className = "cart__item__content";

            //ajout troisieme div
            let kanapDivDescription = document.createElement("div");
            kanapDivContent.appendChild(kanapDivDescription);
            kanapDivDescription.className = "cart__item__content__description";

            //ajout h2
            let kanapTitle = document.createElement("h2");
            kanapDivDescription.appendChild(kanapTitle);
            kanapTitle.innerHTML = kanapLocalStorage[i].name;


            //ajout p la couleur
            let kanapTxt = document.createElement("p");
            kanapDivDescription.appendChild(kanapTxt);
            kanapTxt.innerHTML = kanapLocalStorage[i].colorKanap;

            // ajout du prix

            let kanapPrice = document.createElement("p");
            kanapDivDescription.appendChild(kanapPrice);

            for (const kanapPrice of data) {
                if (kanapLocalStorage[i].idKanap === data._id) {
                    kanapPrice.innerHTML = kanapPrice.price + "$";
                }
            }



            //ajout de la div setting
            let kanapContentSetting = document.createElement("div");
            kanapDivContent.appendChild(kanapContentSetting);
            kanapContentSetting.className = "cart__item__content__settings";

            //ajout de la div quantity
            let kanapQuantityDiv = document.createElement("div");
            kanapContentSetting.appendChild(kanapQuantityDiv);
            kanapQuantityDiv.className = "cart__item__content__settings__quantity"

            //ajout du paragraphe qui contient la quantité
            let kanapQuantity = document.createElement("p");
            kanapQuantityDiv.appendChild(kanapQuantity);
            kanapQuantity.innerText = "Qté : ";

            //ajout de l'élement input
            let addKanapQuantity = document.createElement("input");
            kanapQuantityDiv.appendChild(addKanapQuantity);
            addKanapQuantity.value = kanapLocalStorage[i].quantity;
            addKanapQuantity.className = "itemQuantity";
            addKanapQuantity.setAttribute("type", "number");
            addKanapQuantity.setAttribute("name", "itemQuantity");
            addKanapQuantity.setAttribute("min", "1");
            addKanapQuantity.setAttribute("max", "100");

            //ajout de la div du button supprimer
            let quantityReset = document.createElement("div");
            kanapDivContent.appendChild(quantityReset);
            quantityReset.className = "cart__item__content__settings__delete";

            //ajout du bouton supprimer
            let kanapDelete = document.createElement("p");
            quantityReset.appendChild(kanapDelete);
            kanapDelete.className = "deleteItem";
            kanapDelete.innerHTML = "Supprimer";

            //écoute le bouton supprimer
            kanapDelete.addEventListener("click", (e) => {

                e.preventDefault();

                //prend l id et la couleur 
                var delId = kanapLocalStorage.Id;
                var delColor = kanapLocalStorage.colorKanap;

                //choix de l'élement cliqué

                kanapLocalStorage = kanapLocalStorage.filter(
                    el => el.Id != delId || el.colorKanap != delColor
                );

                //envoie les donnée
                localStorage.getItem("cart", JSON.stringify(kanapLocalStorage));

                //popup suppression et reload
                alert(" Votre canapé à bien été supprimer");

                // si pas de canapé dans le panier
                if (kanapLocalStorage.length != 0) {
                    localStorage.clear();
                }

                //reload
                location.reload();

            });

        }
    }
}