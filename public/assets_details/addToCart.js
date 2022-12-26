$(document).ready(function () {
  $("#BuyNow").click(async function () {
    const productID = parseInt($("#ID").text());
    const data = {
      productID: productID,
    };
    $.post("/user/api/cart/add", data);
  });
});
