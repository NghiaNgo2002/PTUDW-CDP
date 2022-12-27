$(document).ready(function(){
    async function loadStatistic () {
        let value = []
        await $.get("/admin/statistic/value", function (result, status) {
            value = Object.values(result);
        });
        var data_arr = [];

        for (i = 0; i < value.length; i++) {
            data_arr.push({
                y: parseInt(value[i]['PRICE']),
                label: value[i]['TIME']
            });
        }

        var chart = new CanvasJS.Chart("myChart", {
            title: {
                text: "Adding & Updating dataPoints"
            },
            data: [
                {
                    type: "area",
                    dataPoints: data_arr
                }
            ]
        });
        chart.render();
    }
    function fetchproducts(){

        $.ajax({
            type : "GET",
            url : "/admin/api/statistic/top_products",

            success: function(response){
                $('#statisticTable tbody').empty();
                $.each(response, (i, product) => {
                    let productRow = '<tr>' +
                        '<td>' + product.name + '</td>' +
                        '<td>' + product.counts + '</td>' +
                        '</tr>';
                    $('#statisticTable tbody').append(productRow);

                });
            },
            error : function(e) {
                alert("ERROR: ", e);
                console.log("ERROR: ", e);
            }
        })
    }
    (async function(){
        await loadStatistic();
        fetchproducts();
    })();
});
