let type = "crypto";
let action = "";

var getData = function(){
    $.get("/data",{type, action},function(res){
        $("#list").append(res); 
    })
}

$(document).ready(()=>{
    getData(type, action);
    $(document).on("click","a",function(e){
        e.stopPropagation();
        e.preventDefault();
        page = 1;
        data = 10;
        $("#list").text("");
        type = $(this).attr("data-name");
        let storeName = $("#title").attr("data-name");
        let storeText = $("#title").text();
        $("#title").attr("data-name", $(this).attr("data-name"));
        $("#title").text($(this).text());
        $(this).attr("data-name", storeName);
        $(this).text(storeText);
        action = "";
        getData(type, action);

        return false;
    });
    $(document).on("click","button",function(e){
        e.stopPropagation();
        e.preventDefault();
        action = $(this).attr("data-action");
        $("#list").html("");
        getData(type, action);
        return false;
    })
})