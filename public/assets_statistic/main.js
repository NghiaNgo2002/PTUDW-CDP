$(document).ready(function(){
    function monthName(mon) {
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mon - 1];
    }
    function loadStatisticByYear (year) {
        let value = [];
        year_data = $("#selectYear").val();
        $.ajax({
            type : "POST",
            url : "/admin/statistic/value",
            data: {
                year: year_data
            },
            success: function(response) {
                value = Object.values(response);
                var data_arr = [];

                for (let i = 0; i < value.length; i++) {
                    data_arr.push({
                        y: parseInt(value[i]['PRICE']),
                        label: monthName(value[i]['TIME'])
                    });
                }

                var chart = new CanvasJS.Chart("myChart", {
                    title: {
                        text: "Statistic"
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: data_arr
                        }
                    ],
                    options: {
                        scaleShowValues: true,
                        scales: {
                            xAxes: [{
                                ticks: {
                                    autoSkip: false
                                }
                            }]
                        }
                    }
                });
                chart.render();
            },
            error : function(e) {
                alert("ERROR: ", e);
                console.log("ERROR: ", e);
            }
        });
    }
    $("#year").change(function() {
        let val = this.value;
        loadStatisticByYear(val);
    })
    $("#month").change(function() {
        let val = this.value;
        loadStatisticByMonth(val);
    })
    function fetchproducts(){

        $.ajax({
            type : "POST",
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

    function loadStatisticByMonth (month) {
        let value = [];
        var month_data;
        if (typeof month !== 'undefined')
        {
            month_data = month;
        }
        else{
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            const d = new Date();
            month_data = monthNames[d.getMonth()];
        }
            $.ajax({
            type : "POST",
            url : "/admin/api/statistic/month",
            data: {
                month: month_data
            },
            success: function(response) {
                value = Object.values(response);
                var data_arr = [];

                for (i = 0; i < value.length; i++) {
                    data_arr.push({
                        y: parseInt(value[i]['PRICE']),
                        label: value[i]['TIME']
                    });
                }

                var chart = new CanvasJS.Chart("monthChart", {
                    title: {
                        text: "Statistic"
                    },
                    data: [
                        {
                            type: "column",
                            dataPoints: data_arr
                        }
                    ]
                });
                chart.render();
            },
            error : function(e) {
                alert("ERROR: ", e);
                console.log("ERROR: ", e);
            }
        });
    }

    (function(){
        loadStatisticByYear();
        fetchproducts();
        loadStatisticByMonth();
    })();
});
