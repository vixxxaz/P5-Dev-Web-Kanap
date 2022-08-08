const api = "http://localhost:3000/api/products/";

let url = new URL(window.location.href);

var id = url.searchParams.get("id");






fetch(api)

.then(function(resultApi) {
    if (resultApi.ok) {

        return resultApi.json();
    }
})

.then(function(data) {

        kanapDisplayCart(data);
    })
    .catch((error) => {

        alert("Erreur de telechargement des données!");
    })


// mettre en place le local storage

var kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));

//variable pour addition des prix
var priceTotalKanap = 0;

//afficher les kanapé choisi sur la page cart

function kanapDisplayCart(data) {

    if (!kanapLocalStorage) {
        //pour le panier vide
        let title = document.querySelector("h1");
        let votrePanier = document.querySelector(".cart");
        title.innerHTML = "votre panier est vide";
        votrePanier.style.display = "none";
        // sinon
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

            for (let kPrice of data) {

                if (kanapLocalStorage[i].Id === kPrice._id) {
                    kanapPrice.innerHTML = kPrice.price + "€";
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
            addKanapQuantity.value = kanapLocalStorage[i].quantityKanap;
            addKanapQuantity.className = "itemQuantity";
            addKanapQuantity.setAttribute("type", "number");
            addKanapQuantity.setAttribute("name", "itemQuantity");
            addKanapQuantity.setAttribute("min", "1");
            addKanapQuantity.setAttribute("max", "100");

            addKanapQuantity.addEventListener("change", (e) => {
                e.preventDefault();

                for (const k of kanapLocalStorage) {
                    if (kanapLocalStorage[i].Id === k.Id && kanapLocalStorage[i].colorKanap === k.colorKanap) {
                        kanapLocalStorage[i].quantityKanap = parseInt(addKanapQuantity.value);
                        localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                        location.reload();
                    }
                }
            })

            //ajout de la div du button supprimer
            let quantityReset = document.createElement("div");
            kanapDivContent.appendChild(quantityReset);
            quantityReset.className = "cart__item__content__settings__delete";

            //ajout du bouton supprimer
            var kanapDelete = document.createElement("p");
            quantityReset.appendChild(kanapDelete);
            kanapDelete.className = "deleteItem";
            kanapDelete.innerHTML = "Supprimer";

            deleteProduct();

            for (const dataElet of data) {
                if (dataElet._id === kanapLocalStorage[i].Id) {
                    priceTotalKanap += dataElet.price * kanapLocalStorage[i].quantityKanap;
                }

            }
            document.getElementById("totalPrice").innerHTML = priceTotalKanap;

        }
    }
}

document.getElementById("totalQuantity").innerHTML = kanapLocalStorage.length;

function deleteProduct() {

    let btnDelete = document.querySelectorAll(".deleteItem");

    for (let j = 0; j < btnDelete.length; j++) {

        btnDelete[j].addEventListener("click", (event) => {

            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = kanapLocalStorage[j].Id;
            let colorDelete = kanapLocalStorage[j].colorKanap;

            kanapLocalStorage = kanapLocalStorage.filter(el => el.Id !== idDelete || el.colorKanap !== colorDelete);

            localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");

            location.reload();
        })
    }
}