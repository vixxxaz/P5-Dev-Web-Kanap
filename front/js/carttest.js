class Cart {
    constructor() {
        let cart = localstorage.getItem("cart");
        if (cart == null) {
            this.cart = [];

        } else {
            this.cart = JSON.parse(cart);
        }
    }
    saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(this.cart))
    }
    addCart(kanap) {
        let findKanap = this.cart.find(p => p.Id === kanap.Id);
        if (findKanap != undefined) {
            findKanap.quantity++;
        } else {
            kanap.quantity = 1;
            this.cart.push(kanap);
        }
        saveCart();

    }
    removeFromCart(kanap) {

        this.cart = this.cart.filter(k => k.id != kanap.id);
        saveCart();
    }

    changeQuantity(kanap, quantity) {

        let foundKanap = this.cart.find(k => k.id == kanap.Id);
        if (foundKanap != undefined) {
            foundKanap.quantity += quantity;
            if (foundKanap.quantity <= 0) {
                removeFromCart(foundKanap);
            } else {
                saveCart();
            }
        }
    }

    getNumberKanap() {

        let number = 0;
        for (let kanap of this.cart) {
            number += kanap.quantity;
        }
        return number;
    }

    getTotalPrice() {

        let total = 0;
        for (let kanap of this.cart) {
            total += kanap.quantity * kanap.price;
        }
        return total;
    }
}