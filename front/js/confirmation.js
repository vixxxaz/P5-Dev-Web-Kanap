url = new URL(window.location.href);
var getId = url.searchParams.get("Id");

function confirmOrder() {

    const orderId = document.getElementById("orderId");

    orderId.innerHTML = getId;

    console.log(getId);

    console.log("bon");

    localStorage.clear();
}

confirmOrder();