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
  var data = {
    totalPages: 1,
    nameFilter: "",
    sort: "",
  };
  $.initData = async function (nameFilter = "", sort = "") {
    let paramName = "&name=" + nameFilter;
    let paramSort = "&sort=" + sort;

    let initReq = await $.get(
      "api/products_menu?page=1" + paramName + paramSort
    );
    data.totalPages = initReq.pagination_info.total_pages;
    defaultOpts.totalPages = data.totalPages;
  };
  var $pagination = $("#pagination-demo");

  var defaultOpts = {
    totalPages: data.totalPages,
    onPageClick: function (evt, page) {
      $.ajax({
        url: "api/products_menu",
        type: "GET",
        data: {
          page: page,
          name: data.nameFilter,
          sort: data.sort,
        },
        success: function (response) {
          total_pages = response.pagination_info.total_pages;
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
  };
  $.initData().then(function () {
    $pagination.twbsPagination(defaultOpts);
  });
  $("#search-bar-form").submit(function (evt) {
    evt.preventDefault();
    data.nameFilter = $("#search-bar-form").serializeArray()[0].value;
    data.sort = "";
    $.initData(data.nameFilter, data.sort).then(function () {
      $pagination.twbsPagination("destroy");
      $pagination.twbsPagination(defaultOpts);
    });
  });
  $("#priceLow").click(function () {
    data.sort = "low";
    $pagination.twbsPagination("destroy");
    $pagination.twbsPagination(defaultOpts);
  });
  $("#priceHigh").click(function () {
    data.sort = "high";
    $pagination.twbsPagination("destroy");
    $pagination.twbsPagination(defaultOpts);
  });
});
