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

        //creer l'element <a>    
        const link = document.createElement('a');

        title.appendChild(link);

        link.href = `http://127.0.0.1:5501/P5-Dev-Web-Kanap/front/html/index.html`;

        link.textContent = "Votre panier est vide, cliquez ici !";

        // Enleve la décoration du lien
        link.style.color = "white";
        link.style.textDecoration = "none";

        votrePanier.style.display = "none";

        // sinon
    } else {

        //Creation des produits dans le panier.
        for (let i = 0; i < kanapLocalStorage.length; i++) {

            let kanapArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(kanapArticle);
            kanapArticle.className = "cart__item";

            //prend l'id du canapé dans le localstorage et l'ajoute dans l'attribut 
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

            // Va chercher le prix en prenant id du localstorage et du canapés choisi
            for (let kPrice of data) {

                if (kanapLocalStorage[i].Id === kPrice._id) {
                    kanapPrice.innerHTML = kPrice.price + "€";
                }

            }

            // ajout de la div setting
            let kanapContentSetting = document.createElement("div");
            kanapDivContent.appendChild(kanapContentSetting);
            kanapContentSetting.className = "cart__item__content__settings";

            // ajout de la div quantity
            let kanapQuantityDiv = document.createElement("div");
            kanapContentSetting.appendChild(kanapQuantityDiv);
            kanapQuantityDiv.className = "cart__item__content__settings__quantity"

            // ajout du paragraphe qui contient la quantité
            let kanapQuantity = document.createElement("p");
            kanapQuantityDiv.appendChild(kanapQuantity);
            kanapQuantity.innerText = "Qté : ";

            // Ajout de l'élement input
            let addKanapQuantity = document.createElement("input");
            kanapQuantityDiv.appendChild(addKanapQuantity);
            addKanapQuantity.value = kanapLocalStorage[i].quantityKanap;
            addKanapQuantity.className = "itemQuantity";
            addKanapQuantity.setAttribute("type", "number");
            addKanapQuantity.setAttribute("name", "itemQuantity");
            addKanapQuantity.setAttribute("min", "1");
            addKanapQuantity.setAttribute("max", "100");

            // Ecoute le changement dans input quantité
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

            //appel de la fonction supprimer


            // calculer le prix total
            for (const dataElet of data) {

                if (dataElet._id === kanapLocalStorage[i].Id) {
                    priceTotalKanap += dataElet.price * kanapLocalStorage[i].quantityKanap;
                }

            }
            //affiche le prix total
            document.getElementById("totalPrice").innerHTML = priceTotalKanap;
        }
        deleteProduct();
    }
}


//ajoute le nombre d'article à cotés du total dans le panier
document.getElementById("totalQuantity").textContent = kanapLocalStorage.length;

//function pour supprimer un produit
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


// crée variable associer au regex qui controle les entrées correct
var addressReg = new RegExp("^[A-zÀ-ú0-9 ,.'\-]+$");
var nameReg = new RegExp("^[A-zÀ-ú \-]+$");
var emailReg = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

// creer un variable pour recuperer la div du message d'erreur
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

// écoute ce que met l utilisateur dans le champs du formulaire
formulaire.firstName.addEventListener("change", (e) => {
    var value = e.target.value;
    if (nameReg.test(value)) {
        firstNameErrorMsg.innerHTML = "";
    } else {
        firstNameErrorMsg.innerHTML = "Incorrect, vérifiez votre prénom.";
    }
});

// creer un variable pour recuperer la div du message d'erreur
var lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");

// écoute ce que met l utilisateur dans le champs du formulaire
formulaire.lastName.addEventListener("change", (e) => {

    var value = e.target.value;
    if (nameReg.test(value)) {
        lastNameErrorMsg.innerHTML = "";
    } else {
        lastNameErrorMsg.innerHTML = "Incorrect, vérifiez votre nom.";
    }
});

// creer un variable pour recuperer la div du message d'erreur
var addressErrorMsg = document.querySelector("#addressErrorMsg");

// écoute ce que met l utilisateur dans le champs du formulaire
formulaire.address.addEventListener("change", (e) => {

    var value = e.target.value;
    if (addressReg.test(value)) {
        addressErrorMsg.innerHTML = "";
    } else {
        addressErrorMsg.innerHTML = "Incorrect, vérifiez votre l'adresse entrée.";
    }
});

// creer un variable pour recuperer la div du message d'erreur
var cityErrorMsg = document.querySelector("#cityErrorMsg");

// écoute ce que met l utilisateur dans le champs du formulaire
formulaire.city.addEventListener("change", (e) => {

    var value = e.target.value;
    if (nameReg.test(value)) {
        cityErrorMsg.innerHTML = "";
    } else {
        cityErrorMsg.innerHTML = "incorrect, vérifiez votre ville.";
    }
});

// creer un variable pour recuperer la div du message d'erreur
var emailErrorMsg = document.querySelector('#emailErrorMsg');

// écoute ce que met l utilisateur dans le champs du formulaire
formulaire.email.addEventListener("change", (e) => {

    var value = e.target.value;
    if (emailReg.test(value)) {
        emailErrorMsg.innerHTML = "";
    } else {
        emailErrorMsg.innerHTML = "Incorrect, vérifiez votre adresse email.";
    }
});

//Récupére le bouton qui passe la commande
var btnOrder = document.querySelector("#order");

function orderKanap() {

    // creer un objet contact avec les valeur de l utilisateur
    let contact = {

        firstName: firstName.value,
        lastName: lastName.value,
        address: address.value,
        city: city.value,
        email: email.value,
    };

    //creer un tableau vide
    let products = [];


    //creer une boucle qui envois l id du localstorage dans le tableau
    for (productList of kanapLocalStorage) {

        let item = kanapLocalStorage.find(p => p.Id == productList.Id);

        if (item != undefined) {

            products.push(productList.Id);

        } else {

            alert("Le panier est vide !");

        }
    }

    //retourne un objet avec les données du formulaire et du produit
    return orderData = { contact, products };
};


//écoute le click sur le bouton commander
btnOrder.addEventListener("click", (event) => {

    event.preventDefault();

    //envois une alerte si un des champ et vierge
    if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {

        alert(" Vous devez renseigner les champs du formulaire !");

        //empeche de passer la commande si le regex test n'est pas valide    
    } else if (nameReg.test(firstName.value) == false || nameReg.test(lastName.value) == false || addressReg.test(address.value) == false || nameReg.test(city.value) == false || emailReg.test(email.value) == false) {

        alert("verifiez vos données de formulaire pour passer commande");

    } else {

        orderKanap();

        // creer le post des données en chaine json
        let options = {

            method: 'post',

            body: JSON.stringify(orderData),

            headers: {
                'accept': 'application/json',
                'content-type': 'application/json'
            },

        };

        //va chercher l'api et les données
        fetch("http://localhost:3000/api/products/order", options)

        .then((response) => response.json())

        .then(data => {
            //vide le localstorage
            localStorage.clear();

            //renvois sur la page comfirmation avec l'id de la commande dans l'url
            window.location = `./confirmation.html?orderid=${data.orderId}`;
        })

        .catch((error) => {
            alert("Probléme chargement de l'api !")
        })
    }
});