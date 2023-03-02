$(window).on("load", function(){
    $('#loader').show();
    $(".container").hide();
    $.ajax({
        type: "get",
        url: "https://api.publicapis.org/entries",
        success: function (response) {
            printTable(response);
        },
        error: function(){
            $('#loader').hide();
            alert("There Is Some Isuue While Fetching Data");
            $("body").html(`<h3 class="text-center">Please Refresh Page To Try Again</h3>`)
            $(".container").show();
        }
    });

    function printTable(data){
        data.entries.forEach(element => {
            var html ="";
            html +=`<tr><td>${element.API}</td><td>${element.Description}</td><td>${element.Auth==""?"-":element.Auth}</td><td>${element.Cors}</td><td><a href="${element.Link}" target="_blank">${element.Link}</a></td><td>${element.Category}</td></tr>`
            $("tbody").append(html);
        });
        $('#loader').hide();
        $(".container").show();
    }
});