var str = window.location.href;
var url = new URL(str);
var idKanap = url.searchParams.get("id");
let kanap = "";



getKanap();

function getKanap() {
    fetch("http://localhost:3000/api/products/" + idKanap)
        .then((res) => {
            return res.json();
        })

    // Répartition des données de l'API dans le DOM
    .then(async function(resultatAPI) {
            kanap = await resultatAPI;
            console.table(kanap);
            if (kanap) {
                kanapDisplay(kanap);
            }
        })
        .catch((error) => {
            console.log("Erreur !");
        })
}


//afficher les information du produit 


function kanapDisplay(kanap) {

    //ajout de l'image

    let kanapImg = document.createElement('img');

    document.querySelector('.item__img').appendChild(kanapImg);

    kanapImg.src = kanap.imageUrl;

    kanapImg.alt = kanap.altTxt;

    //ajout du nom

    let name = kanap.name;

    document.getElementById('title').innerHTML = name;

    // ajout du prix

    let price = kanap.price;

    document.getElementById('price').innerHTML = price;

    // ajout description

    let description = kanap.description;

    document.getElementById('description').innerHTML = description;

    //option et couleur

    let options = kanap.colors;

    //avoir la liste deroulante

    var liste = document.getElementById("colors");

    //loop dans le tableau

    for (var i = 0; i < options.length; ++i) {

        //ajout des couleur du tableau

        liste[liste.length] = new Option(options[i], options[i]);

    };

    addToCart(kanap);

}

// choix de l utilisateur

const colorChoice = document.querySelector("#colors")
const quantityChoice = document.querySelector("#quantity")

// function ajout dans le panier

function addToCart(kanapId) {

    //recuperer le bouton

    let btnSendToCart = document.querySelector("#addToCart");

    //Ecouter le click sur le bouton avec la condition sur la couleur et le nombre

    btnSendToCart.addEventListener("click", () => {

        if (quantityChoice.value > 0 && quantityChoice.value <= 100 && quantityChoice.value != 0 && colorChoice.value != 0) {

            //choix couleur
            let colors = colorChoice.value;

            //choix quantity
            let quantity = quantityChoice.value;

            // option du kanap
            let optionsKanap = {
                Id: kanapId,
                colorKanap: colors,
                quantity: Number(quantity),
                // price: kanapId.price,
                description: kanapId.description,
                name: kanapId.name,
                imgKanap: kanapId.imageUrl,
                altImg: kanapId.altTxt,
            };

            //creer le local storage
            let kanapLocalStorage = JSON.parse(localStorage.getItem("kanap"));

            //fenetre pop up ajout kanap

            const popUpComfirmation = () => {
                if (window.confirm(`Votre commande de ${kanapId.name} à bien été ajouter au panier`)) {
                    window.location.href = 'cart.html';
                }
            }

            //importation dans le local storage
            if (kanapLocalStorage) {
                const resultFind = kanapLocalStorage.find(
                    (el) => el.Id === kanapId && el.colorKanap === colors);

                // si le panier à déjà un article

                if (resultFind) {
                    let newQuantity =
                        parseInt(optionsKanap.quantity) + parseInt(resultFind.quantity);
                    resultFind.quantity = newQuantity;
                    localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
                    popUpComfirmation();

                    //si le produit n'est pas dans le panier    
                } else {
                    kanapLocalStorage.push(optionsKanap);
                    localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
                    popUpComfirmation();
                }
                // panier vide
            } else {
                kanapLocalStorage = [];
                kanapLocalStorage.push(optionsKanap);
                localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
                popUpComfirmation();
            }
        }
    });

}