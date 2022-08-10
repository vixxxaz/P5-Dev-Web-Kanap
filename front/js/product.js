const api = "http://localhost:3000/api/products/";

let url = new URL(window.location.href);

var id = url.searchParams.get("id");

var data = "";




fetch(api + id)

.then(function(resultApi) {
    if (resultApi.ok) {
        return resultApi.json();
    }
})

.then(function(data) {

    kanapDisplay(data);
})

.catch(function(error) {

    alert("Erreur de telechargement des données!");
})




//afficher les information du produit 


function kanapDisplay(data) {

    //ajout de l'image

    let kanapImg = document.createElement('img');

    document.querySelector('.item__img').appendChild(kanapImg);

    kanapImg.src = data.imageUrl;

    kanapImg.alt = data.altTxt;

    //ajout du nom

    let name = data.name;

    document.getElementById('title').innerHTML = name;

    // ajout du prix

    let price = data.price;

    document.getElementById('price').innerHTML = price;

    // ajout description

    let description = data.description;

    document.getElementById('description').innerHTML = description;

    //option et couleur

    let options = data.colors;

    //avoir la liste deroulante

    var liste = document.getElementById("colors");

    //loop dans le tableau

    for (var i = 0; i < options.length; ++i) {

        //ajout des couleur du tableau

        liste[liste.length] = new Option(options[i], options[i]);

    };

    addToCart(data);

}


// choix de l utilisateur

var colorChosen = document.querySelector("#colors")
var quantityChosen = document.querySelector("#quantity")



// function ajout dans le panier

function addToCart(data) {

    //recuperer le bouton

    let btnSendToCart = document.querySelector("#addToCart");

    //fenetre pop up ajout kanap

    const popUpComfirmation = () => {
        if (window.confirm(`Votre commande de ${data.name} à bien été ajouter au panier`)) {
            window.location.href = 'cart.html';
        }
    }

    // //creer le local storage
    // var kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));
    //Ecouter le click sur le bouton avec la condition sur la couleur et le nombre

    btnSendToCart.addEventListener("click", () => {

        if (quantityChosen.value > 0 && quantityChosen.value <= 100 && quantityChosen.value != 0) {

            //choix couleur
            let colorsChoice = colorChosen.value;

            //choix quantity
            let quantityChoice = quantityChosen.value;

            let kanapfound = false;
            let position = 0;
            let add = true;

            // option du kanap
            var optionsKanap = {
                Id: id,
                colorKanap: colorsChoice,
                quantityKanap: quantityChoice,
                name: data.name,
                imgKanap: data.imageUrl,
                altImg: data.altTxt,
            };
            console.table(optionsKanap);
            console.log("bon");



            //creer le localStorage
            let kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));
            console.log(kanapLocalStorage);


            //importation dans le local storage
            if (kanapLocalStorage) {

                for (let i = 0; i < (kanapLocalStorage.length); i++) {

                    if (optionsKanap.Id === kanapLocalStorage[i].Id &&
                        optionsKanap.colorKanap === kanapLocalStorage[i].colorKanap) {

                        if (optionsKanap.quantityKanap + kanapLocalStorage[i].quantityKanap > 100) {

                            alert("Impossible d\'ajouter ce produit car limité à 100");

                            add = false;

                        } else {

                            kanapfound = true;
                            position = i;
                            break;
                        }

                    }
                }
                console.log(add);

                let resultFind = kanapLocalStorage.find(
                    (el) => el.Id === optionsKanap.Id && el.colorKanap === optionsKanap.colorKanap
                );

                //si le panier à déjà un article
                if (resultFind && add === true) {
                    let newQuantity =
                        parseInt(optionsKanap.quantityKanap) + parseInt(resultFind.quantityKanap);
                    resultFind.quantityKanap = newQuantity;

                    localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));

                    // si le kanap est deja dans le panier
                } else if (add === true) {
                    kanapLocalStorage.push(optionsKanap);

                }

            } else {
                kanapLocalStorage = [];
                kanapLocalStorage.push(optionsKanap);

            }
            localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
            popUpComfirmation()
        }
    });

}