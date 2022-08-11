var urlConfirm = window.location.href;
var url = new URL(urlConfirm);
var orderId = url.searchParams.get("orderid");
document.getElementById("orderId").innerHTML = `${orderId}`;