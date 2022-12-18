/**
 * Accepts either a URL or querystring and returns an object associating
 * each querystring parameter to its value.
 *
 * Returns an empty object if no querystring parameters found.
 */
function getUrlParams(urlOrQueryString) {
  if ((i = urlOrQueryString.indexOf("?")) >= 0) {
    const queryString = urlOrQueryString.substring(i + 1);
    if (queryString) {
      return _mapUrlParams(queryString);
    }
  }

  return {};
}

/**
 * Helper function for `getUrlParams()`
 * Builds the querystring parameter to value object map.
 *
 * @param queryString {string} - The full querystring, without the leading '?'.
 */
function _mapUrlParams(queryString) {
  return queryString
    .split("&")
    .map(function (keyValueString) {
      return keyValueString.split("=");
    })
    .reduce(function (urlParams, [key, value]) {
      if (Number.isInteger(parseInt(value)) && parseInt(value) == value) {
        urlParams[key] = parseInt(value);
      } else {
        urlParams[key] = decodeURI(value);
      }
      return urlParams;
    }, {});
}

$(document).ready(function () {
  $.ajax({
    //The URL to process the request
    url: "api/products_menu",
    //The type of request, also known as the "method" in HTML forms
    //Can be 'GET' or 'POST'
    type: "GET",
    //Any post-data/get-data parameters
    //This is optional
    data: {
      page: 1,
      limit: 3,
    },
    //The response from the server
    success: function (response) {
      //You can use any jQuery/JavaScript here!!!
      total_pages = response.pagination_info.total_pages;
      params = getUrlParams(location.search);
      if (response == "success") {
        alert("request sent!");
      }
    },
  }).then(function () {
    $("#pagination-demo").twbsPagination({
      totalPages: total_pages,
      visiblePages: 3,
      onPageClick: function (event, page) {
        console.log(1, total_pages);
        $.ajax({
          //The URL to process the request
          url: "api/products_menu",
          //The type of request, also known as the "method" in HTML forms
          //Can be 'GET' or 'POST'
          type: "GET",
          //Any post-data/get-data parameters
          //This is optional
          data: {
            page: page,
            name: params.name,
          },
          //The response from the server
          success: function (response) {
            //You can use any jQuery/JavaScript here!!!
            total_pages = response.pagination_info.total_pages;
            console.log(0, response.pagination_info.total_pages);
            console.log(2, response);
            if (response == "success") {
              alert("request sent!");
            }
            $("#TimKiem").empty();
            $.each(response.products, (i, product) => {
              let content =
                '<div class="col-lg-4 menu-item">' +
                '<a href="products/' +
                product.ID +
                '">' +
                " <div>" +
                "<img " +
                'src="/assets_menu/img/menu/' +
                product.IMAGE +
                '"' +
                ' class="menu-img img-fluid"' +
                ' alt=""' +
                "/>" +
                "</div>" +
                "<div>" +
                "<h4>" +
                product.NAME +
                "</h4>" +
                '<p class="price">' +
                product.PRICE +
                "VNĐ" +
                "</p>" +
                "</div>" +
                "</a>" +
                "</div>";
              $("#TimKiem").append(content);
            });
          },
        });
      },
    });
  });
});
