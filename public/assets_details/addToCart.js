$(document).ready(function () {
  $("#AddToCart").click(async function () {
    const productID = parseInt($("#ID").text());
    const data = {
      productID: productID,
    };
    $.post("/user/api/cart/add", data);
    $("#alert-success").show();
  });
  $("#BuyNow").on("click", async function (e) {
    e.preventDefault();
    const productID = parseInt($("#ID").text());
    const data = {
      productID: productID,
    };
    await $.post("/user/api/cart/add", data);
    window.location.href = "/user/cart";
  });
});
