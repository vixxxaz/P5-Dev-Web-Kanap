//creer une varible qui contient l'adresse de l'api
const api = "http://localhost:3000/api/products/";

//creer une variable qui contient l'adresse de la page
let url = new URL(window.location.href);

//creer une variable qui va chercher l'id
var id = url.searchParams.get("id");

//Fonction qui va recuperer les données q l'adresse l'api
fetch(api)

//Si on recois les données on les retourne en .json
.then(function(resultApi) {
    if (resultApi.ok) {

        return resultApi.json();
    }
})

//ajoute les données de l'api á la fonction kannapdysplay
.then(function(data) {

    kanapDisplayCart(data);
})

//envois une erreur si on n'accéde pas au données
.catch((error) => {

    alert("Erreur de telechargement des données!");
})


// On recupere le localstorage dans une variable
var kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));

//variable pour addition des prix
var priceTotalKanap = 0;


//function qui va afficher les kanapés choisis sur la page cart (les données de l'api en parametre)
function kanapDisplayCart(data) {

    if (!kanapLocalStorage || kanapLocalStorage.length === 0) {

        /** pour le panier vide, ajout d'un message
         * et d'un lien vers la page d'accueil!
         */
        const title = document.querySelector("h1");

        const votrePanier = document.querySelector(".cart");

        let link = document.createElement('a');

        title.appendChild(link);

        link.href = `./index.html`;

        link.textContent = "Votre panier est vide, cliquez ici !";

        // Enleve la décoration du lien
        link.style.color = "white";
        link.style.textDecoration = "none";

        //fait disparaitre le reste de la page si le panier est vide
        votrePanier.style.display = "none";

        // sinon le panier n'est pas vide
    } else {

        //creer une boucle pour parcourir le localstorage et afficher les articles
        for (let i = 0; i < kanapLocalStorage.length; i++) {

            //Ajoute l'élement article et ajoute une classe et en attribut id du kanapé du localstorage
            let kanapArticle = document.createElement("article");
            document.querySelector("#cart__items").appendChild(kanapArticle);
            kanapArticle.className = "cart__item";
            kanapArticle.setAttribute("data-id", kanapLocalStorage[i].Id);

            //div de l image
            let kanapDiv = document.createElement("div");
            kanapArticle.appendChild(kanapDiv);
            kanapDiv.className = "cart__item__img";

            //ajout de l'image du localstorage
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

            //ajout h2 et insert le nom du localstorage
            let kanapTitle = document.createElement("h2");
            kanapDivDescription.appendChild(kanapTitle);
            kanapTitle.innerHTML = kanapLocalStorage[i].name;

            //ajout de la couleur (contenu dans le localstorage)
            let kanapTxt = document.createElement("p");
            kanapDivDescription.appendChild(kanapTxt);
            kanapTxt.innerHTML = kanapLocalStorage[i].colorKanap;

            // ajout du prix
            let kanapPrice = document.createElement("p");
            kanapDivDescription.appendChild(kanapPrice);

            //Creer une boucle dans les données de l'api
            for (let kPrice of data) {
                //Recupére le prix en comparant les id des kanapés
                if (kanapLocalStorage[i].Id === kPrice._id) {
                    //insert le prix
                    kanapPrice.innerHTML = kPrice.price + "€";
                }
            };

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

            //ajout de l'élement input et de ses attribut
            let addKanapQuantity = document.createElement("input");
            kanapQuantityDiv.appendChild(addKanapQuantity);
            addKanapQuantity.value = kanapLocalStorage[i].quantityKanap;
            addKanapQuantity.className = "itemQuantity";
            addKanapQuantity.setAttribute("type", "number");
            addKanapQuantity.setAttribute("name", "itemQuantity");
            addKanapQuantity.setAttribute("min", "1");
            addKanapQuantity.setAttribute("max", "100");


            //Ecoute le changement dans quantité sur l'input qté:
            addKanapQuantity.addEventListener("change", (e) => {

                e.preventDefault();

                //Crée une boucle dans le localstorage
                for (const k of kanapLocalStorage) {

                    //compare les id du localstorage et la couleur
                    if (kanapLocalStorage[i].Id === k.Id && kanapLocalStorage[i].colorKanap === k.colorKanap) {

                        //supprime le prix du canapé dans le prix total
                        priceTotalKanap -= kanapLocalStorage[i].quantityKanap * parseInt(kanapPrice.textContent);

                        if ((parseInt(addKanapQuantity.value)) > 0) {

                            //recupere la nouvelle quantitée si elle n'est pas negative 
                            kanapLocalStorage[i].quantityKanap = parseInt(addKanapQuantity.value);

                        }

                        //sauvegarde la nouvelle quantité dans le ls
                        localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));

                        //recalcule le prix total avec la nouvelle quantité
                        priceTotalKanap += parseInt(kanapPrice.textContent) * kanapLocalStorage[i].quantityKanap;

                        //insert la nouvel quantité
                        document.getElementById("totalPrice").innerHTML = priceTotalKanap;

                        //Variable pour calculer le nombre de kanapés dans le panier
                        let totalKanap = 0;

                        //boucle qui parcour le localstorage
                        for (let y = 0; y < kanapLocalStorage.length; y++) {

                            //ajoute la quqntité de kanapés quand on modifie les inputs
                            totalKanap += parseInt(kanapLocalStorage[y].quantityKanap);

                            //insert la quantitée
                            document.getElementById("totalQuantity").textContent = totalKanap;

                        }
                    }
                }

            });

            //ajout de la div du button supprimer
            let quantityReset = document.createElement("div");
            kanapDivContent.appendChild(quantityReset);
            quantityReset.className = "cart__item__content__settings__delete";

            //ajout du bouton supprimer
            var kanapDelete = document.createElement("p");
            quantityReset.appendChild(kanapDelete);
            kanapDelete.className = "deleteItem";
            kanapDelete.innerHTML = "Supprimer";

            // calcul le prix total
            for (const dataElet of data) {

                //Si les id correspondent au localstorage
                if (dataElet._id === kanapLocalStorage[i].Id) {

                    //ajoute le prix et multipli par la quantitée
                    priceTotalKanap += dataElet.price * kanapLocalStorage[i].quantityKanap;
                }
            };

            //Insert le prix total 
            document.getElementById("totalPrice").innerHTML = priceTotalKanap;
        }
        //appel la fonction supprimer un produit
        deleteProduct();
    }
};


// document.getElementById("totalPrice").innerHTML = priceTotalKanap;

// Ajoute le nombre total de canapé à cotés du prix 
let totalKanap = 0;

//boucle qui parcour le localstorage
for (let z = 0; z < kanapLocalStorage.length; z++) {

    //ajoute la quantité de kanapés quand on ajoute des produits depuis la page d'acceuil
    totalKanap += parseInt(kanapLocalStorage[z].quantityKanap);
};

//insert la quantité
document.getElementById("totalQuantity").textContent = totalKanap;




//function supprimer un produit
function deleteProduct() {

    //recupere le bouton supprimer
    let btnDelete = document.querySelectorAll(".deleteItem");

    //creer une boucle sur le bouton
    for (let j = 0; j < btnDelete.length; j++) {

        //ecoute le click sur le bouton supprimer
        btnDelete[j].addEventListener("click", (event) => {

            event.preventDefault();

            //Selection de l'element à supprimer en fonction de son id ET sa couleur
            let idDelete = kanapLocalStorage[j].Id;
            let colorDelete = kanapLocalStorage[j].colorKanap;

            //utilise filter pour choisir le bon canapé et écrase le ls
            kanapLocalStorage = kanapLocalStorage.filter(el => el.Id !== idDelete || el.colorKanap !== colorDelete);

            // met á jour le localstorage
            localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));

            //Alerte produit supprimé et refresh
            alert("Ce produit a bien été supprimé du panier");

            //recharge la page
            location.reload();
        })
    }
}

/**************************************************************************partie formulaire ******************************************************/
//prendre le formulaire
let formulaire = document.querySelector(".cart__order__form");


/**crée des variables associées a des regex, qui vont controler les entrées de l'utilisateur
 * formule qui donne quels caracteres sont authorisés 
 * pour valider le formulaire */
var addressReg = new RegExp("^[a-z0-9][a-z '-.,]{1,31}$|^$");
var nameReg = new RegExp("^[A-zÀ-ú \-]+$");
var emailReg = new RegExp("^[a-zA-Z0-9_. -]+@[a-zA-Z.-]+[.]{1}[a-z]{2,10}$");

// creer un variable pour recuperer la div du message d'erreur
const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");

// écoute les changement de l'utilisateur dans le champs du formulaire firstname
formulaire.firstName.addEventListener("change", (e) => {
    //cible l'element 
    var value = e.target.value;

    //si il respecte la regex, pas de message
    if (nameReg.test(value)) {
        firstNameErrorMsg.innerHTML = "";

        //si ne respecte pas la regex insert message d'erreur    
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

//creer une fonction pour la commande
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

        //trouver le produit en comparant les id
        let item = kanapLocalStorage.find(p => p.Id == productList.Id);


        if (item != undefined) {

            //Si different de undefined push du produit dans le tableau
            products.push(productList.Id);

        } else {
            //sinon panier est vide
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

        //appel de la fonction de commande
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

        //envois la reponse en json
        .then((response) => response.json())

        .then(data => {

            //vide le localstorage
            localStorage.clear();

            //renvois sur la page comfirmation avec l'id de la commande dans l'url
            window.location = `./confirmation.html?orderid=${data.orderId}`;
        })

        //erreur si l'api ne repond pas
        .catch((error) => {
            alert("Probléme chargement de l'api !")
        })
    }
});