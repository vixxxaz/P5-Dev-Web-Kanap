var str = window.location.href;
var url = new URL(str);
var idKanap = url.searchParams.get("id");
let data = "";




fetch("http://localhost:3000/api/products/" + idKanap)

.then(function(resapi) {
    if (resapi.ok) {
        return resapi.json();
    }

})

// Répartition des données de l'API dans le DOM
.then(function(data) {
        kanapDisplay(data);
    })
    .catch((error) => {
        alert("Erreur !");
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
//ajout au local storage

// choix de l utilisateur

var colorChosen = document.querySelector("#colors")
var quantityChosen = document.querySelector("#quantity")
var btnSendToCart = document.querySelector("#addToCart");
// function ajout dans le panier

function addToCart(data) {




    //recuperer le bouton

    const btnSendToCart = document.querySelector("#addToCart");

    //Ecouter le click sur le bouton avec la condition sur la couleur et le nombre

    btnSendToCart.addEventListener("click", (event) => {

        if (quantityChosen.value > 0 && quantityChosen.value <= 100 && quantityChosen.value != 0 && colorChosen.value != 0) {

            //choix couleur
            var colorsChoice = colorChosen.value;

            //choix quantity
            var quantityChoice = quantityChosen.value;

            // option du kanap
            var optionsKanap = {
                Id: idKanap,
                colorKanap: colorsChoice,
                quantityKanap: quantityChoice,
                name: data.name,
                imgKanap: data.imageUrl,
                altImg: data.altTxt,
            };
            console.log(optionsKanap.Id);

            //creer le local storage
            var kanapLocalStorage = JSON.parse(localStorage.getItem("cart"));


            //fenetre pop up ajout kanap

            const popUpComfirmation = () => {
                if (window.confirm(`Votre commande de ${data.name} à bien été ajouter au panier`)) {
                    window.location.href = 'cart.html';
                }
            }

            //importation dans le local storage


            if (kanapLocalStorage) {
                let resultFind = kanapLocalStorage.find(
                    el =>
                    el.idKanap === optionsKanap.Id && el.colorKanap === optionsKanap.colorKanap);

                // si le panier à déjà un article

                if (resultFind) {

                    let newQuantity =
                        parseInt(optionsKanap.quantityKanap) + parseInt(resultFind.quantityKanap);
                    resultFind.quantityKanap = newQuantity;
                    localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                    popUpComfirmation();

                    //si le produit n'est pas dans le panier    
                } else {

                    kanapLocalStorage.push(optionsKanap);
                    localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                    popUpComfirmation();
                }
                // panier vide
            } else {
                kanapLocalStorage = [];
                kanapLocalStorage.push(optionsKanap);
                localStorage.setItem("cart", JSON.stringify(kanapLocalStorage));
                popUpComfirmation();
            }
        }
    });

}