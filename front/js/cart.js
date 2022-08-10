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

    if (!kanapLocalStorage || (kanapLocalStorage.length) === 0) {

        //pour le panier vide

        const title = document.querySelector("h1");

        const votrePanier = document.querySelector(".cart");

        title.textContent = "votre panier est vide";

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

document.getElementById("totalQuantity").textContent = kanapLocalStorage.length;

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

//prendre le formaulaire

let formulaire = document.querySelector(".cart__order__form");


// crée variable regex
var adressReg = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var nameReg = new RegExp("^[A-zÀ-ú \-]+$");
var emailReg = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");


var firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

formulaire.firstName.addEventListener("change", function(e) {
    var value = e.target.value;
    if (nameReg.test(value)) {
        firstNameErrorMsg.innerHTML = "";
    } else {
        firstNameErrorMsg.innerHTML = "Incorrect, vérifiez votre prénom.";
    }
});

var lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

formulaire.lastName.addEventListener("change", function(e) {
    var value = e.target.value;
    if (nameReg.test(value)) {
        lastNameErrorMsg.innerHTML = "";
    } else {
        lastNameErrorMsg.innerHTML = "Incorrect, vérifiez votre nom.";
    }
});

var adressErrorMsg = document.querySelector("#addressErrorMsg");

formulaire.address.addEventListener("change", function(e) {
    var value = e.target.value;
    if (adressReg.test(value)) {
        adressErrorMsg.innerHTML = "";
    } else {
        adressErrorMsg.innerHTML = "Incorrect, vérifiez votre adresse postale.";
    }
});

var cityErrorMsg = document.querySelector("#cityErrorMsg");

formulaire.city.addEventListener("change", function(e) {
    var value = e.target.value;
    if (nameReg.test(value)) {
        cityErrorMsg.innerHTML = "";
    } else {
        cityErrorMsg.innerHTML = "incorrect, vérifiez votre ville.";
    }
});

var emailErrorMsg = document.querySelector('#emailErrorMsg');

formulaire.email.addEventListener("change", function(e) {
    var value = e.target.value;
    if (emailReg.test(value)) {
        emailErrorMsg.innerHTML = "";
    } else {
        emailErrorMsg.innerHTML = "Incorrect, vérifiez votre adresse email.";
    }
});

//Passer commande
var btnOrder = document.querySelector("#order");

btnOrder.addEventListener("click", (event) => {

    event.preventDefault();

    let userFirstName = document.getElementById("firstName");
    let userLastName = document.getElementById("lastName");
    let userAddress = document.getElementById("address");
    let userCity = document.getElementById("city");
    let userEmail = document.getElementById("email");

    if (kanapLocalStorage === null) {

        event.preventDefault();

        alert("Pour passer commande, veuillez ajouter des produits à votre panier");



    } else if (userFirstName.value === "" || userLastName.value === "" || userAddress.value === "" || userCity.value === "" || userEmail.value === "") {

        event.preventDefault();

        alert(" Vous devez renseigner les champs du formulaire !");



    } else if (nameReg.test(userFirstName.value) === false || nameReg.test(userLastName.value) === false || adressReg.test(userAddress.value) === false || nameReg.test(userCity.value) === false || emailReg.test(userEmail.value) === false) {

        event.preventDefault();

        alert("Vérifiez vos coordonnées pour passer la commande !");



    } else {

        let orderId = [];

        for (let item = 0; item < (kanapLocalStorage.length); item++) {

            orderId.push(kanapLocalStorage[item].Id);

        }
        console.log(orderId);
        console.log("bon");

        let order = {
            user: {
                firstName: userFirstName.value,
                lastName: userLastName.value,
                address: userAddress.value,
                city: userCity.value,
                email: userEmail.value,
            },
            products: orderId,
        }


        const choice = {

            method: 'post',

            body: JSON.stringify(order),

            header: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },

        };

        fetch("http://localhost:3000/api/products/order", choice)

        .then((res) => res.json())

        .then((dataId) => {

            localStorage.setItem('orderId', dataId.orderId);

            document.location.href = 'confirmation.html?Id=' + dataId.orderId;
        })


        .catch((error) => {
            alert("probleme api")
        });
    }
});