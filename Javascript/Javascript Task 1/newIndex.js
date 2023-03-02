document.querySelector("input[type=submit]").addEventListener('click', function() {
    var value="";
    var inputs = document.querySelectorAll("input[type=text]");
    let i;
    for(i=0; i<inputs.length; i++){
        if(inputs[i].value==""){
            continue;
        }
        else{
            value += `<li>`+inputs[i].value+`</li>`;
        }
    }
    if(value==""){
        alert("Please Enter Some Text");
    }
    else{
        var add = document.getElementById("inputText");
        add.innerHTML= `<h1 class="text-center">Enter Text</h1>`;
        add.insertAdjacentHTML('beforeend', value);
    }
});