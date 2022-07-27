// Recuperer les données de l api:


(async function() {

    const kanapId = getKanapId()

    const kanap = await getKanap(kanapId)

    kanapDisplay(kanap)


})();


function getKanapId() {

    return new URL(location.href).searchParams.get('id')

};


// relier la nouvelle page a l' id du produit 

async function getKanap(kanapId) {

    return fetch(`http://localhost:3000/api/products/${kanapId}`)

    .then(function(resultApi) {

        return resultApi.json();
    })

    .then(function(kanaps) {

        return kanaps
    })

    .catch(function(error) {

        alert(error)
    })

};



//afficher les information du produit 


function kanapDisplay(kanapId) {

    //ajout de l'image

    let kanapImg = document.createElement('img');

    document.querySelector('.item__img').appendChild(kanapImg);

    kanapImg.src = kanapId.imageUrl;

    kanapImg.alt = kanapId.altTxt;

    //ajout du nom

    let name = kanapId.name;

    document.getElementById('title').innerHTML = name;

    // ajout du prix

    let price = kanapId.price;

    document.getElementById('price').innerHTML = price;

    // ajout description

    let description = kanapId.description;

    document.getElementById('description').innerHTML = description;

    //option et couleur

    let options = kanapId.colors;

    //avoir la liste deroulante

    var liste = document.getElementById("colors");

    //loop dans le tableau

    for (var i = 0; i < options.length; ++i) {

        //ajout des couleur du tableau

        liste[liste.length] = new Option(options[i], options[i]);

    };

    addToCart(kanapId);

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

        if (quantity.value > 0 && quantity.value <= 100 && colors.value != 0) {

            //choix couleur
            let colors = colorChoice.value;

            //choix quantity
            let quantity = quantityChoice.value;

            // option du kanap
            let optionsKanap = {
                Id: kanapId,
                colorKanap: colors,
                quantity: Number(quantity),
                price: kanapId.price,
                description: kanapId.description,
                name: kanapId.name,
                imgKanap: kanapId.imageUrl,
                altImg: kanapId.altTxt,
            };

            //creer le local storage
            let kanapLocalStorage = JSON.parse(localStorage.getItem("kanap"));

            //fenetre pop up ajout kanap

            const popUpComfiration = () => {
                if (window.confirm(`Votre produit à bien été ajouter au panier`)) {
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
                    console.table(kanapLocalStorage);
                    popUpComfiration();

                    //si le produit n'est pas dans le panier    
                } else {
                    kanapLocalStorage.push(optionsKanap);
                    localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
                    console.table(kanapLocalStorage);
                    popUpComfiration();
                }
                // panier vide
            } else {
                kanapLocalStorage = [];
                kanapLocalStorage.push(optionsKanap);
                localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
                console.table(kanapLocalStorage);
                popUpComfiration();
            }
        }
    });

}