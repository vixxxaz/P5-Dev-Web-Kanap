function saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function getCart() {
    let cart = localStorage.getItem("cart");
    if (cart == null) {
        return [];
    } else {
        return JSON.parse(cart);
    }
}

function addCart(kanap) {
    let cart = getCart();
    let foundKanap = cart.find(k => k.id == kanap.Id);
    if (foundKanap != undefined) {
        foundKanap.quantity++;
    } else {
        kanap.quantity = 1;
        cart.push(kanap);
    }

    saveCart(cart);
}

function removeFromCart(kanap) {
    let cart = getCart();
    cart = cart.filter(k => k.id != kanap.id);
    saveCart(cart);
}

function changeQuantity(kanap, quantity) {
    let cart = getCart();
    let foundKanap = cart.find(k => k.id == kanap.Id);
    if (foundKanap != undefined) {
        foundKanap.quantity += quantity;
        if (foundKanap.quantity <= 0) {
            removeFromCart(foundKanap);
        } else {
            saveCart(cart);
        }
    }

}

function getNumberKanap() {
    let cart = getCart();
    let number = 0;
    for (let kanap of cart) {
        number += kanap.quantity;
    }
    return number;
}

function getTotalPrice() {
    let cart = getCart();
    let total = 0;
    for (let kanap of cart) {
        total += kanap.quantity * kanap.price;
    }
    return total;
}
f