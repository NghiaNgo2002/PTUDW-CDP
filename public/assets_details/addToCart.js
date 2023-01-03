$(document).ready(function () {
  $("#AddToCart").click(async function () {
    const productID = parseInt($("#ID").text());
    const data = {
      productID: productID,
    };
    $.post("/user/api/cart/add", data);
    $("#alert-success").show();
  });

  $("#BuyNow").click(async function () {
    const productID = parseInt($("#ID").text());
    const data = {
      productID: productID,
    };
    $.post("/user/api/cart/add", data);
  });
});
