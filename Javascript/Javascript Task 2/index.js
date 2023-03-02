window.onload = function () {
    start()
}
function start(){
    document.getElementById("inputField").innerHTML =`<div class="row mt-3 align-items-center ">
                                                        <div class="col-sm-10 col-md-11">
                                                            <input type="text" class="inputBox" id="input1" placeholder="Input Task here">
                                                        </div>
                                                        <div class="col-sm-2 col-md-1 d-flex justify-content-center">
                                                            <button onclick="action(this,0)" id="removeBtn" class="btn btn-outline-danger">X</button>
                                                        </div>
                                                    </div>`
    document.getElementById("removeBtn").style.display = "none";
    document.getElementById("addBtn").disabled = false;
    num = 1;
}
var num;
function action(minusElement,perform){
    switch(perform) {
        case 0:
            num--;
            document.getElementById("addBtn").disabled = false;
            minusElement.parentNode.parentNode.remove();
            num == 1 ? document.getElementById("removeBtn").style.display = "none":null;
          break;

        case 1:
            num++;
            num == 10 ? document.getElementById("addBtn").disabled = "true" : null;
            document.getElementById("removeBtn").style.display = "block";
            var add = document.getElementById("inputField").lastChild;
            add.insertAdjacentHTML('afterend', '<div class="row mt-3 align-items-center "> <div class="col-sm-10 col-md-11"> <input type="text" class="inputBox" id="input1" placeholder="Input Task here"> </div> <div class="col-sm-2 col-md-1 d-flex justify-content-center"><button onclick="action(this,0)" id="removeBtn" class="btn btn-outline-danger">X</button></div></div>');
          break;
      }
}
function refresh() {
    start()
}